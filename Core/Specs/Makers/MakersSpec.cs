using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specs.Makers
{
    public class MakersSpec : BaseSpecification<Maker>
    {
        public MakersSpec() : base()
        {

        }
        public MakersSpec(int id) : base(x => x.Id == id)
        {

        }
    }
}
