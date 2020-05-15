using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Core.Entities
{
    public class Category : BaseEntity
    {
        [Display(Name="Category Name")]
        [Required]
        [MaxLength(250)]
        public string Name { get; set; }
        public IEnumerable<Device> Devices { get; set; }
    }
}
