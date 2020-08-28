using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Dtos.Account
{
    public class TokenDTO
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
