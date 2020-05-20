using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Dtos
{
    public class CategoryForCreationDTO
    {
        [Display(Name = "Category Name")]
        [Required]
        [StringLength(250)]
        public string Name { get; set; }
    }
}
