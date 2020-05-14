using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Entities
{
    public class Maker
    {
        [Key]
        public int Id { get; set; }
        [Display(Name="Maker Name")]
        [Required]
        [MaxLength(365)]
        public string Name { get; set; }
        public List<Device> Devices { get; set; } = new List<Device>();
    }
}
