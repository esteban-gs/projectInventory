using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Entities
{
    // Db Schema: https://dbdiagram.io/d/5ec178b039d18f5553ff55bb
    public interface IBaseEntity
    {
        int Id { get; set; }
    }
    public abstract class BaseEntity : IBaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
