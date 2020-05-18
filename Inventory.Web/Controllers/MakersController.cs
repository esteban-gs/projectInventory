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
using Core.Specs;
using Inventory.Web.Dtos;

namespace Inventory.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MakersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MakersController(
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        // GET: api/Makers
        [HttpGet]
        public ActionResult<IEnumerable<MakersForReturnDTO>> GetMakers()
        {
            var makers = _unitOfWork.Repository<Maker>()
                            .Find(new MakersSpec())
                            .ToList();

            return Ok(_mapper
                .Map<IEnumerable<MakersForReturnDTO>>(makers));
        }

        // GET: api/Makers/5
        [HttpGet("{id}", Name = nameof(GetMaker))]
        public ActionResult<MakersForReturnDTO> GetMaker(int id)
        {
            var maker = _unitOfWork.Repository<Maker>().Find(
                new MakersSpec(id)
                ).SingleOrDefault();

            if (maker == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<MakersForReturnDTO>(maker));
        }

        // PUT: api/Makers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaker(int id, [FromBody] MakersForCreationDTO makerForCreation)
        {
            var maker = _mapper.Map<Maker>(makerForCreation);
            maker.Id = id;
            _unitOfWork.Repository<Maker>().Update(maker);

            try
            {
                await _unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _unitOfWork.Repository<Maker>().Contains(d => maker.Id == id))
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

        // POST: api/Makers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Maker>> PostMaker([FromBody] MakersForCreationDTO makerforCreation)
        {
            var maker = _mapper.Map<Maker>(makerforCreation);
            await _unitOfWork.Repository<Maker>().Add(maker);
            await _unitOfWork.Complete();

            // mapp to a returnable obj
            var makerToReturn = _mapper.Map<MakersForReturnDTO>(maker);

            return new CreatedAtRouteResult(nameof(GetMaker), new { maker.Id }, makerToReturn);
        }

        // DELETE: api/Makers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Maker>> DeleteMaker(int id)
        {
            var maker = await _unitOfWork.Repository<Maker>().FindById(id);
            if (maker == null)
            {
                return NotFound();
            }

            _unitOfWork.Repository<Maker>().Remove(maker);
            await _unitOfWork.Complete();

            return NoContent();
        }
    }
}
