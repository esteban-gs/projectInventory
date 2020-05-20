using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Dtos
{
    public class MakersForCreationDTO
    {
        [Display(Name = "Maker Name")]
        [Required]
        [MaxLength(365)]
        public string Name { get; set; }
    }
}
