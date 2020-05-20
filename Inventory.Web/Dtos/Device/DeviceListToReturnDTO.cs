using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Dtos
{
    public class DeviceListToReturnDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Purchased { get; set; }
        public decimal Value { get; set; }
        public string ProductId { get; set; }
        public string Category { get; set; }
        public string Maker { get; set; }

        public int EmployeesAssigned { get; set; }
    }
}
