using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Dtos
{
    public class EmployeeDeviceToReturnDTO
    {
        public int EmployeeId { get; set; }
        public string Employee { get; set; }
        public DateTime CheckOutDate { get; set; }
        public DateTime? CheckInDate { get; set; }
    }
}
