using Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Dtos
{
    public class DeviceForCreationDTO
    {
        [Required(ErrorMessage ="The field with name {0} is required")]
        [MaxLength(365)]
        public string Name { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }
        public DateTime Purchased { get; set; }
        [Required]
        public decimal Value { get; set; }
        [Required(ErrorMessage = "The field with name {0} is required")]
        [StringLength(20)]
        public string ProductId { get; set; }
        public int CategoryId { get; set; }
        public int MakerId { get; set; }
    }
}
