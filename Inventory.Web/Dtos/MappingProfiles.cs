using AutoMapper;
using Core.Entities;
using Inventory.Web.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Device details
            CreateMap<Device, DeviceToReturnDto>()
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name))
                .ForMember(d => d.Maker, o => o.MapFrom(s => s.Maker.Name))
                .ForMember(d => d.EmployeeDevicesList, o => o.MapFrom(MapEmployeesDevicesList));

            // Device List
            CreateMap<Device, DeviceListToReturnDTO>()
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name))
                .ForMember(d => d.Maker, o => o.MapFrom(s => s.Maker.Name))
                .ForMember(d => d.EmployeesAssigned, o => o.MapFrom(s => s.EmployeeDevice.Count()));

            // Device Creation
            CreateMap<DeviceForCreationDTO, Device>()
                .ForMember(d => d.EmployeeDevice, o => o.MapFrom(MapEmployeesDevices));

            // Category
            CreateMap<Category, CategoryToReturnDTO>();
            CreateMap<CategoryForCreationDTO, Category>();

            // makers
            CreateMap<Maker, MakersForReturnDTO>();
            CreateMap<MakersForCreationDTO, Maker>();

            // employees
            CreateMap<Employee, EmployeeForReturnDTO>();
            CreateMap<EmployeeForCreationDTO, Employee>();
        }

        private List<EmployeeDevice> MapEmployeesDevices(
            DeviceForCreationDTO deviceForCreationDTO,
            Device device
            )
        {
            var result = new List<EmployeeDevice>();
            foreach (var id in deviceForCreationDTO.EmployeesIds)
            {
                result.Add(
                    new EmployeeDevice()
                    {
                        DeviceId = device.Id,
                        EmployeeId = id,
                        CheckOutDate = DateTime.Now
                    });
            }
            return result;
        }

        private List<EmployeeDeviceToReturnDTO> MapEmployeesDevicesList(
            Device device,
            DeviceToReturnDto deviceToReturnDto
            )
        {
            var dbNullDate = "1/1/0001";
            var dbNullDateInCs = DateTime.Parse(dbNullDate);

            var result = new List<EmployeeDeviceToReturnDTO>();
            foreach (var ed in device.EmployeeDevice)
            {
                var edToReturn = new EmployeeDeviceToReturnDTO()
                {
                    EmployeeId = ed.EmployeeId,
                    CheckOutDate = ed.CheckOutDate,
                    CheckInDate = ed.CheckInDate
                };

                if (ed.CheckInDate == dbNullDateInCs)
                {
                    edToReturn.CheckInDate = null;
                }

                result.Add(edToReturn);
            }
            return result;
        }
    }
}
