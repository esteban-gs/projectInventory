using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Dtos
{
    public class DeviceListToReturnDTO
    {
        /// <summary>
        /// The ID of the Device Record
        /// </summary>
        /// <example>1</example>
        public int Id { get; set; }
        /// <summary>
        /// The Device Name
        /// </summary>
        /// <example>
        ///     Trusty_Kranken_Swag    
        /// </example>
        public string Name { get; set; }
        /// <summary>
        /// The general description of the Device
        /// </summary>
        /// <example>
        ///     In very good condition
        /// </example>
        public string Description { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <example>
        ///     2018-12-21T00:00:00
        /// </example>
        public DateTime Purchased { get; set; }
        public decimal Value { get; set; }
        public string ProductId { get; set; }
        public string Category { get; set; }
        public string Maker { get; set; }

        public int EmployeesAssigned { get; set; }
    }
}
