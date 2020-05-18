using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Entities
{
    // Db Schema: https://dbdiagram.io/d/5ec178b039d18f5553ff55bb
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
