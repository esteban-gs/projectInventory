using Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Dtos
{
    public class EmployeeForCreationDTO
    {
        [Required]
        [MaxLength(365)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(365)]
        public string LastName { get; set; }
        [Required(ErrorMessage = "SSN is Required")]
        [MaxLength(11)]
        [RegularExpression(@"^\d{9}|\d{3}-\d{2}-\d{4}$", ErrorMessage = "Invalid Social Security Number")]
        public string SocialSecurityNumber { get; set; }
        [MaxLength(15)]
        public string BadgeNumber { get; set; }
        [Required]
        public DateTime HireDate { get; set; }
    }
}
