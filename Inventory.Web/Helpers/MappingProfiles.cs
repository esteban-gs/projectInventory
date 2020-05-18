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
            // Device
            CreateMap<Device, DeviceToReturnDto>()
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name))
                .ForMember(d => d.Maker, o => o.MapFrom(s => s.Maker.Name))
                .ReverseMap();
            CreateMap<DeviceForCreationDTO, Device>();

            // Category
            CreateMap<Category, CategoryToReturnDTO>();
            CreateMap<CategoryForCreationDTO, Category>();

            // makers
            CreateMap<Maker, MakersForReturnDTO>();
            CreateMap<MakersForCreationDTO, Maker>();

            // employees
            CreateMap<Employee, EmployeeForReturnDTO>();
            CreateMap<EmployeeForCreationDTO, Employee>();

            ////EmployeeDevices
            //CreateMap<EmployeeDevice, EmployeesDevicesForReturnDTO>()
            //    .ForMember(e => e.Employee, o => o.MapFrom(s => (s.Employee.FirstName + " " + s.Employee.LastName)))
            //    .ForMember(e => e.Device, o => o.MapFrom(s => s.Device.Name));
            //CreateMap<EmployeeDevice, EmployeesListDevicesForReturnDTO>()
            //    .ForMember(elfr => elfr.DeviceCount, o => o.MapFrom(ed =>ed.Device.Id));

        }
    }
}
