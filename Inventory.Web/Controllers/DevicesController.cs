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
using Core.Specs;
using Inventory.Web.Dtos;
using AutoMapper;
using System.Net.Http.Headers;
using System.Security.Policy;
using Inventory.Web.Helpers;
using System.Runtime.CompilerServices;
using Core.Specs.SpecificationParams;

namespace Inventory.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DevicesController(
            IUnitOfWork unitOfWork,
            IMapper mapper
            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Get paginated list of Devices with a count of assigned employess for every device
        /// </summary>
        /// <param name="deviceParams">A headerParams object from query</param>
        /// <returns></returns>
        // GET: api/Devices
        [HttpGet]
        public async Task<ActionResult<Pagination<DeviceListToReturnDTO>>> GetDevices([FromQuery] DeviceParams deviceParams)
        {
            // record count with filters applied
            var countSpec = new DevicesWithFilterForCountSpec(deviceParams);

            var totalDevices = await _unitOfWork.Repository<Device>().CountAsync(countSpec);

            var devices = _unitOfWork.Repository<Device>()
                .Find(new DevicesWithCategoryAndMakerAndEmployeeDevices(deviceParams))
                .ToList();

            var data = _mapper.Map<IEnumerable<DeviceListToReturnDTO>>(devices);

            return Ok(new Pagination<DeviceListToReturnDTO>(
                            deviceParams.Page, 
                            deviceParams.RecordsPerPage,
                            totalDevices,
                            data)
                );
        }

        // GET: api/Devices/5
        [HttpGet("{id}", Name = nameof(GetDevice))]
        public ActionResult<DeviceToReturnDto> GetDevice(int id)
        {
            var device = _unitOfWork.Repository<Device>()
                .Find(new DevicesWithCategoryAndMakerAndEmployeeDevices(id))
                .SingleOrDefault();

            if (device == null)
            {
                return NotFound();
            }
            var deviceToReturn = _mapper.Map<DeviceToReturnDto>(device);
            return Ok(deviceToReturn);
        }

        // PUT: api/Devices/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDevice(int id, [FromBody] DeviceForCreationDTO deviceForCreationDTO)
        {
            var device = _mapper.Map<Device>(deviceForCreationDTO);
            device.Id = id;

            // Get the updated device's EmployeeDevice List
            var updatedDeviceEmployeeDevices = _unitOfWork.Repository<EmployeeDevice>()
                .Find(new EmployeeDevicesOfADeviceSpec(id))
                .ToList();

            // Remove the list
            _unitOfWork.Repository<EmployeeDevice>()
                .RemoveRange(updatedDeviceEmployeeDevices);

            _unitOfWork.Repository<Device>().Update(device);

            try
            {
                await _unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _unitOfWork.Repository<Device>().Contains(d => device.Id == id))
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

        // POST: api/Devices
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Device>> PostDevice([FromBody] DeviceForCreationDTO deviceForCreationDTO)
        {
            var device = _mapper.Map<Device>(deviceForCreationDTO);
            await _unitOfWork.Repository<Device>().Add(device);
            await _unitOfWork.Complete();

            // fetch created entity with child values
            var deviceFromDb = _unitOfWork.Repository<Device>().Find(
                new DevicesWithCategoryAndMakerAndEmployeeDevices(device.Id)
                ).SingleOrDefault();

            // mapp to a returnable obj
            var deviceToReturn = _mapper.Map<DeviceToReturnDto>(deviceFromDb);

            return new CreatedAtRouteResult(nameof(GetDevice), new { deviceToReturn.Id }, deviceToReturn);
        }

        // DELETE: api/Devices/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDevice(int id)
        {
            var device = await _unitOfWork.Repository<Device>().FindById(id);
            if (device == null)
            {
                return NotFound();
            }

            _unitOfWork.Repository<Device>().Remove(device);
            await _unitOfWork.Complete();

            return NoContent();
        }
    }
}
