using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Text;

namespace Core.Entities
{
    public class Employee : BaseEntity
    {
        [Required]
        [MaxLength(365)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(365)]
        public string  LastName { get; set; }
        [Required(ErrorMessage = "SSN is Required")]
        [MaxLength(11)]
        [RegularExpression(@"^\d{9}|\d{3}-\d{2}-\d{4}$", ErrorMessage = "Invalid Social Security Number")]
        public string SocialSecurityNumber { get; set; }
        [MaxLength(15)]
        public string BadgeNumber { get; set; }
        [Required]
        public DateTime HireDate { get; set; }
        public List<EmployeeDevice> EmployeeDevice { get; set; }
    }
}
