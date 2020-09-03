using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specs.Employees
{
    public class EmployeesSpec : BaseSpecification<Employee>
    {
        public EmployeesSpec(int skip, int take) : base()
        {
            ApplyPaging(skip, take);
        }
        public EmployeesSpec(int id) : base(x => x.Id == id) 
        {

        }
    }
}
