using Core.Entities;
using Core.Specs.SpecificationParams;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specs
{
    /// <summary>
    /// Class specification for counting records in a table
    /// </summary>
    public class DevicesWithFilterForCountSpec : BaseSpecification<Device>
    {
        public DevicesWithFilterForCountSpec(DeviceParams deviceParams) 
            : base(x =>
                (string.IsNullOrEmpty(deviceParams.Search) || x.Name.ToLower()
                                                                    .Contains(deviceParams.Search)) &&
                (!deviceParams.CategoryId.HasValue || x.CategoryId == deviceParams.CategoryId) &&
                (!deviceParams.MakerId.HasValue || x.MakerId == deviceParams.MakerId)
            )
        {

        }
    }
}
