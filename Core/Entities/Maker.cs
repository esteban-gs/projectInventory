using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Entities
{
    public class Maker : BaseEntity
    {
        [Display(Name="Maker Name")]
        [Required]
        [MaxLength(365)]
        public string Name { get; set; }
        public IEnumerable<Device> Devices { get; set; }
    }
}
