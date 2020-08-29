using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Inventory.Web.Dtos.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

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

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._configuration = configuration;
        }
        // GET: api/<AccountController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AccountController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AccountController>/Register
        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<ActionResult<TokenDTO>> Post([FromBody] UserInfoDTO userInfoDTO)
        {
            var user = new IdentityUser { UserName = userInfoDTO.Email, Email = userInfoDTO.Email };
            var result = await _userManager.CreateAsync(user, userInfoDTO.Password);

            if (result.Succeeded)
            {
                return BuildToken(userInfoDTO);
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

            if(result.Succeeded)
            {
                return BuildToken(userInfoDTO);
            }
            else
            {
                return BadRequest("Invalid Login");
            }
        }

        [NonAction]
        private TokenDTO BuildToken(UserInfoDTO userInfo)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, userInfo.Email),
                new Claim(ClaimTypes.Email, userInfo.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["jwt:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.UtcNow.AddMinutes(120);

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

        // PUT api/<AccountController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AccountController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
