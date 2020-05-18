using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Core.Entities
{
    public class EmployeeDevice : BaseEntity
    {
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        [ForeignKey("Category")]
        public int DeviceId { get; set; }
        public Employee Employee { get; set; }
        public Device Device { get; set; }
        [Required]
        public DateTime CheckOutDate { get; set; }
        public DateTime CheckInDate { get; set; }
    }
}
