using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Entities;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using AutoMapper;
using Inventory.Web.Dtos;
using Core.Specs;

namespace Inventory.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoriesController(
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        // GET: api/Categories
        [HttpGet]
        public ActionResult<IEnumerable<CategoryToReturnDTO>> GetCategories()
        {
            var categories = _unitOfWork.Repository<Category>()
                .Find(new CategoriesSpec())
                .ToList();

            return Ok(_mapper
                .Map<IEnumerable<CategoryToReturnDTO>>(categories));
        }

        // GET: api/Categories/5
        [HttpGet("{id}", Name = nameof(GetCategory))]
        public ActionResult<CategoryToReturnDTO> GetCategory(int id)
        {
            var category = _unitOfWork.Repository<Category>().Find(
                new CategoriesSpec(id)
                ).SingleOrDefault();

            if (category == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CategoryToReturnDTO>(category));
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, [FromBody] CategoryForCreationDTO  categoryForCreation)
        {
            var category = _mapper.Map<Category>(categoryForCreation);
            category.Id = id;
            _unitOfWork.Repository<Category>().Update(category);

            try
            {
                await _unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _unitOfWork.Repository<Category>().Contains(d => category.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Categories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromBody] CategoryForCreationDTO categoryForCreation)
        {
            var category = _mapper.Map<Category>(categoryForCreation);
            await _unitOfWork.Repository<Category>().Add(category);
            await _unitOfWork.Complete();

            // mapp to a returnable obj
            var categoryToReturn = _mapper.Map<CategoryToReturnDTO>(category);

            return new CreatedAtRouteResult(nameof(GetCategory), new { category.Id }, categoryToReturn);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            var category = await _unitOfWork.Repository<Category>().FindById(id);
            if (category == null)
            {
                return NotFound();
            }

            _unitOfWork.Repository<Category>().Remove(category);
            await _unitOfWork.Complete();

            return NoContent();
        }
    }
}
