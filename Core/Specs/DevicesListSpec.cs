using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specs
{
    public class DevicesListSpec : BaseSpecification<Device>
    {
        public DevicesListSpec() : base()
        {
            AddInclude(d => d.Category);
            AddInclude(d => d.Maker);
        }
        public DevicesListSpec(int id) : base(x => x.Id == id)
        {
            AddInclude(d => d.Category);
            AddInclude(d => d.Maker);
        }
    }
}
