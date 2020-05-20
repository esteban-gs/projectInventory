using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core.Specs
{
    public class DevicesWithCategoryAndMakerAndEmployeeDevices : BaseSpecification<Device>
    {
        public DevicesWithCategoryAndMakerAndEmployeeDevices(int skip, int take) : base()
        {
            AddInclude(d => d.Category);
            AddInclude(d => d.Maker);
            AddInclude(d => d.EmployeeDevice);
            ApplyPaging(skip, take);
        }
        public DevicesWithCategoryAndMakerAndEmployeeDevices(int id) : base(x => x.Id == id)
        {
            AddInclude(d => d.Category);
            AddInclude(d => d.Maker);
            AddInclude(d => d.EmployeeDevice);
        }
    }
}
