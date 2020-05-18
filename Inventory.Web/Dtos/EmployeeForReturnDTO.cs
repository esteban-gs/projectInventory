using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Dtos
{
    public class EmployeeForReturnDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SocialSecurityNumber { get; set; }
        public string BadgeNumber { get; set; }
        public DateTime HireDate { get; set; }
    }
}
