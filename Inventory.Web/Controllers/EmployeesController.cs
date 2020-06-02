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
using Inventory.Web.Dtos.Pagination;
using Inventory.Web.Helpers;

namespace Inventory.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EmployeesController(
            IUnitOfWork unitOfWork,
            IMapper mapper
            )
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeForReturnDTO>>> GetEmployees([FromQuery] PaginationDTO pagination)
        {
            var entityCount = await _unitOfWork.Repository<Employee>().CountAsync(d => d.Id != 0);

            await HttpContext.InsertPaginationParametersInResponse(entityCount, pagination.RecordsPerPage);

            var employees = _unitOfWork.Repository<Employee>()
                .Find(new EmployeesSpec((pagination.Page - 1) * pagination.RecordsPerPage, pagination.RecordsPerPage))
                .ToList();

            return Ok(_mapper
                .Map<IEnumerable<EmployeeForReturnDTO>>(employees));
        }

        // GET: api/Employees/5
        [HttpGet("{id}", Name = nameof(GetEmployee))]
        public ActionResult<EmployeeForReturnDTO> GetEmployee(int id)
        {
            var employee = _unitOfWork.Repository<Employee>()
                .Find(new EmployeesSpec(id))
                .SingleOrDefault();

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<EmployeeForReturnDTO>(employee));
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, [FromBody] EmployeeForCreationDTO employeeForCreation)
        {
            var employee = _mapper.Map<Employee>(employeeForCreation);
            employee.Id = id;
            _unitOfWork.Repository<Employee>().Update(employee);

            try
            {
                await _unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _unitOfWork.Repository<Employee>().Contains(d => employee.Id == id))
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

        // POST: api/Employees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee([FromBody] EmployeeForCreationDTO employeeForCreation)
        {
            var employee = _mapper.Map<Employee>(employeeForCreation);
            await _unitOfWork.Repository<Employee>().Add(employee);
            await _unitOfWork.Complete();

            // mapp to a returnable obj
            var employeeToReturn = _mapper.Map<EmployeeForReturnDTO>(employee);

            return new CreatedAtRouteResult(nameof(GetEmployee), new { employee.Id }, employeeToReturn);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee = await _unitOfWork.Repository<Employee>().FindById(id);
            if (employee == null)
            {
                return NotFound();
            }

            _unitOfWork.Repository<Employee>().Remove(employee);
            await _unitOfWork.Complete();

            return NoContent();
        }
    }
}
