using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Text;

namespace Core.Entities
{
    public class Device
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(365)]
        public string Name { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }
        public DateTime Purchased { get; set; }
        [Required]
        public decimal Value { get; set; }
        [Required]
        [MaxLength(365)]
        public string ProductId { get; set; }
    }
}
