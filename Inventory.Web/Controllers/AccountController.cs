using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Inventory.Web.Dtos.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Infrastructure.Data.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Core.Specs.SpecificationParams;
using Core.Specs;
using Core.Specs.SpecificationParams.Shared;
using AutoMapper;
using Inventory.Web.Helpers;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Internal;
using Core.Specs.Users;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Inventory.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._configuration = configuration;
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        // POST api/<AccountController>/Register
        [HttpPost("Register")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TokenDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TokenDTO>> Post([FromBody] UserInfoDTO userInfoDTO)
        {
            var user = new IdentityUser { UserName = userInfoDTO.Email, Email = userInfoDTO.Email };
            var result = await _userManager.CreateAsync(user, userInfoDTO.Password);

            if (result.Succeeded)
            {
                return  await BuildToken(userInfoDTO);
            }
            else
            {
                return BadRequest(result.Errors);
            }

        }

        // POST api/<AccountController>/Login
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<ActionResult<TokenDTO>> Login([FromBody] UserInfoDTO userInfoDTO)
        {
            var result = await _signInManager.PasswordSignInAsync(userInfoDTO.Email,
                userInfoDTO.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return await BuildToken(userInfoDTO);
            }
            else
            {
                return BadRequest("Invalid Login");
            }
        }

        // POST api/<AccountController>/RenewToken
        [HttpPost("RenewToken")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<TokenDTO>> RenewToken()
        {
            var userInfo = new UserInfoDTO()
            {
                Email = HttpContext.User.Identity.Name
            };

            return await BuildToken(userInfo);
        }

        [NonAction]
        private async Task<TokenDTO> BuildToken(UserInfoDTO userInfo)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, userInfo.Email),
                new Claim(ClaimTypes.Email, userInfo.Email),
            };

            var identityUser = await _userManager.FindByEmailAsync(userInfo.Email);
            var claimsDB = await _userManager.GetClaimsAsync(identityUser);

            claims.AddRange(claimsDB);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwt:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.UtcNow.AddMinutes(1);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["jwt:issuer"],
                audience: _configuration["jwt:audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            return new TokenDTO()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }

        [HttpGet("Users")]
        public async Task<ActionResult<PaginationViewModel<UserDTO>>> Get([FromQuery] BaseParams baseParams)
        {
            Expression<Func<IdentityUser, bool>> 
                searchExpression = (u) => string.IsNullOrEmpty(baseParams.Search)
                                        || u.Email.Contains(baseParams.Search)
                                        || u.UserName.Contains(baseParams.Search); // Search implementation 

            var countSpec = new UsersWithFiltersForCountSpec(searchExpression); // A spec with filters
            var filteredCount = await _unitOfWork.Repository<IdentityUser>().CountAsync(countSpec); // count filtered records
            var userSpec = new UserSpecification<IdentityUser>(baseParams, searchExpression); // The spec with the core functionality
            var users = _unitOfWork.Repository<IdentityUser>().Find(userSpec); // Find users given the specification
            var usersDTO = _mapper.Map<List<UserDTO>>(users); // Map to ViewModel
            return Ok(new PaginationViewModel<UserDTO>(
                baseParams.Page,
                baseParams.RecordsPerPage,
                filteredCount,
                usersDTO));
        }

        [HttpGet("Roles")]
        public ActionResult<List<RolesDTO>> GetRoles()
        {
            var rolesSpecification = new RolesSpecs();
            var roles = _unitOfWork.Repository<IdentityRole>().Find(rolesSpecification);
            return Ok(_mapper.Map<List<RolesDTO>>(roles));
        }

        [HttpPost("AssignRole")]
        public async Task<ActionResult> AssignRole(EditRoleDTO editRoleDTO)
        {
            var user = await _userManager.FindByIdAsync(editRoleDTO.UserId);
            if (user == null)
            {
                return NotFound();
            }
            await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, editRoleDTO.RoleName));
            return NoContent();
        }

        [HttpPost("RemoveRole")]
        public async Task<ActionResult> RemoveRole(EditRoleDTO editRoleDTO)
        {
            var user = await _userManager.FindByIdAsync(editRoleDTO.UserId);
            if (user == null)
            {
                return NotFound();
            }

            await _userManager.RemoveClaimAsync(user, new Claim(ClaimTypes.Role, editRoleDTO.RoleName));
            return NoContent();
        }
    }
}
