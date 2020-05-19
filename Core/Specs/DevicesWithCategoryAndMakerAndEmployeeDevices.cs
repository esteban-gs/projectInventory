using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core.Specs
{
    public class DevicesWithCategoryAndMakerAndEmployeeDevices : BaseSpecification<Device>
    {
        public DevicesWithCategoryAndMakerAndEmployeeDevices() : base()
        {
            AddInclude(d => d.Category);
            AddInclude(d => d.Maker);
            AddInclude(d => d.EmployeeDevice);
        }
        public DevicesWithCategoryAndMakerAndEmployeeDevices(int id) : base(x => x.Id == id)
        {
            AddInclude(d => d.Category);
            AddInclude(d => d.Maker);
            AddInclude(d => d.EmployeeDevice);
        }
    }
}
