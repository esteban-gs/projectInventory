using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specs.Categories
{
    public class CategoriesSpec : BaseSpecification<Category>
    {
        public CategoriesSpec() : base()
        {

        }
        public CategoriesSpec(int id) : base(x => x.Id == id)
        {

        }
    }
}
