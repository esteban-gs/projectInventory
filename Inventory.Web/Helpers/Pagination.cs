using Microsoft.CodeAnalysis.Operations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Helpers
{
    public class Pagination<T> where T : class
    {
        public Pagination(int page, int recordsPerPage, int count, IEnumerable<T> data)
        {
            Page = page;
            RecordsPerPage = recordsPerPage;
            Count = count;
            Data = data;
        }

        public int Page { get; set; }
        public int RecordsPerPage { get; set; }
        public int Count { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}
