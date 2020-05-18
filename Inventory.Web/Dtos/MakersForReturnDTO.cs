using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Dtos
{
    public class MakersForReturnDTO
    {
        public int Id { get; set; }
        [Display(Name = "Maker Name")]
        public string Name { get; set; }
    }
}
