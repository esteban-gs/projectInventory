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
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // GET: api/Devices
        [HttpGet]
        public ActionResult<IEnumerable<Device>> GetDevices()
        {
            return _unitOfWork.Repository<Device>().Find(
                new DevicesListSpec()
                ).ToList();
        }

        // GET: api/Devices/5
        [HttpGet("{id}")]
        public ActionResult<DeviceToReturnDto> GetDevice(int id)
        {
            var device = _unitOfWork.Repository<Device>().Find(
                new DevicesListSpec(id)
                ).SingleOrDefault();

            if (device == null)
            {
                return NotFound();
            }

            return _mapper.Map<Device, DeviceToReturnDto>(device);
        }

        // PUT: api/Devices/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public IActionResult PutDevice(int id, Device device)
        {
            if (id != device.Id)
            {
                return BadRequest();
            }

            _unitOfWork.Repository<Device>().Update(device);

            try
            {
                _unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_unitOfWork.Repository<Device>().Contains(d => device.Id == id))
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
        public ActionResult<Device> PostDevice([FromBody] Device device)
        {
            _unitOfWork.Repository<Device>().Add(device);
            _unitOfWork.Complete();

            return CreatedAtAction("GetDevice", new { id = device.Id }, device);
        }

        // DELETE: api/Devices/5
        [HttpDelete("{id}")]
        public ActionResult<Device> DeleteDevice(int id)
        {
            var device = _unitOfWork.Repository<Device>().FindById(id);
            if (device == null)
            {
                return NotFound();
            }

            _unitOfWork.Repository<Device>().Remove(device);
            _unitOfWork.Complete();

            return device;
        }

        private bool DeviceExists(int id)
        {
            return _unitOfWork.Repository<Device>().Contains(d => d.Id == id);
        }
    }
}
