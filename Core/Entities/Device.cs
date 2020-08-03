using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Text;


namespace Core.Entities
{
    public class Device : BaseEntity
    {
        [Required]
        [MaxLength(365)]
        public string Name { get; set; }
        [MaxLength(500)]
        public string Description { get; set; }
        public DateTime Purchased { get; set; }
        [Required]
        public decimal Value { get; set; }
        [Required]
        public string ProductId { get; set; }
        [ForeignKey("Category")]
        public int? CategoryId { get; set; }
        public Category Category { get; set; }
        [ForeignKey("Maker")]
        public int? MakerId { get; set; }
        public Maker Maker { get; set; }
        public List<EmployeeDevice> EmployeeDevice { get; set; }
    }
}
