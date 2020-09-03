using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Core.Specs.Users
{
    public class UsersWithFiltersForCountSpec : BaseSpecification<IdentityUser>
    {
        public UsersWithFiltersForCountSpec(Expression<Func<IdentityUser, bool>> searchExpression) : base(searchExpression)
        {

        }
    }
}
