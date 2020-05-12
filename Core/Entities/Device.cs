using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Text;

namespace Core.Entities
{
    public enum Condition
    {
        Perfect,
        OK,
        Bad
    }

    public class Device
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(365)]
        public string Name { get; set; }
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
        public DateTime Purchased { get; set; }
        public decimal Value { get; set; }
        [Required]
        public Condition Condition { get; set; }

        [ForeignKey("DeviceId")]
        public DeviceCategory DeviceCategory { get; set; }
    }
}
