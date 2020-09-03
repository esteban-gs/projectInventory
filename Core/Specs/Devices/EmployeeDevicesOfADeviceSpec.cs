using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specs.Devices
{
    public class EmployeeDevicesOfADeviceSpec : BaseSpecification<EmployeeDevice>
    {
        public EmployeeDevicesOfADeviceSpec(int id) : base(x => x.DeviceId == id)
        {
        }
    }
}
