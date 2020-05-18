using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specs
{
    public class DevicesWithCategoryAndMaker : BaseSpecification<Device>
    {
        public DevicesWithCategoryAndMaker() : base()
        {
            AddInclude(d => d.Category);
            AddInclude(d => d.Maker);
        }
        public DevicesWithCategoryAndMaker(int id) : base(x => x.Id == id)
        {
            AddInclude(d => d.Category);
            AddInclude(d => d.Maker);
        }
    }
}
