using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specs
{
    public class EmployeesSpec : BaseSpecification<Employee>
    {
        public EmployeesSpec() : base()
        {

        }
        public EmployeesSpec(int id) : base(x => x.Id == id) 
        {

        }
    }
}
