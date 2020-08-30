using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure
{
    public static class UserSeed
    {
        public const string RoleName = "Admin";

        public const string UsersJson = @"
[
    {
        'email': 'admin@test.com',
        'password': 'Secret123$'
    },
    {
        'email': 'test2@test.com',
        'password': 'Secret123$'
    }
]
";
    }
}
