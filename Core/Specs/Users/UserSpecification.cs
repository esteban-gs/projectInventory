using Core.Specs.SpecificationParams.Shared;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Core.Specs.Users
{
    public class UserSpecification<T> : BaseSpecification<IdentityUser> where T : class
    { 
        public UserSpecification(BaseParams baseParams, Expression<Func<IdentityUser, bool>> searchExpresion) : base(searchExpresion)
        {

            if (!string.IsNullOrEmpty(baseParams.Sort))
            {
                switch (baseParams.Sort)
                {
                    // email
                    case "emailAsc":
                        ApplyOrderBy(u => u.Email);
                        break;
                    case "emailDesc":
                        ApplyOrderByDescending(u => u.Email);
                        break;

                    // id
                    case "idAsc":
                        ApplyOrderBy(u => u.Id);
                        break;

                    case "idDesc":
                        ApplyOrderByDescending(u => u.Id);
                        break;

                    default:
                        ApplyOrderBy(u => u.Id);
                        break;
                }
            }
            else // default sort
            {
                ApplyOrderByDescending(d => d.Id);
            }

            var skip = (baseParams.Page - 1) * baseParams.RecordsPerPage;
            ApplyPaging(skip, baseParams.RecordsPerPage);
        }
    }
}
