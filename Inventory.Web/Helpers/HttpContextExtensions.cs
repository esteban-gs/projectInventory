using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventory.Web.Helpers
{
    public static class HttpContextExtensions
    {
        public static Task InsertPaginationParametersInResponse(
            this HttpContext httpContext,
            double entityCount,
            int recordsPerPage
            )
        {
            if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

            double totalAmountPages = Math.Ceiling(entityCount / recordsPerPage);
            httpContext.Response.Headers
                .Add("totalPages", totalAmountPages.ToString());
            return Task.CompletedTask;
        }
    }
}
