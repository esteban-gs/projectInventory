using Core.Entities;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Infrastructure.Data
{
    public static class InventoryInitializer
    {
        public static async Task SeedAsync(
            InventoryDBContext context,
            ILoggerFactory loggerFactory,
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager
            )
        {
            try
            {
                context.Database.EnsureCreated();

                var dbIsEmpty = !context.Devices.Any() &&
                                !context.Employees.Any() &&
                                !context.EmployeesDevices.Any();

                if (dbIsEmpty)
                {
                    await SeedRepository<Category>.AddFromJson(DeviceCategorySeed.Json, context);
                    await SeedRepository<Maker>.AddFromJson(DeviceMakerSeed.Json, context);
                    await SeedRepository<Device>.AddFromJson(DeviceSeed.Json, context);
                    await SeedRepository<Employee>.AddFromJson(EmployeeSeed.Json, context);
                    await SeedRepository<EmployeeDevice>.AddFromJson(EmployeeDeviceSeed.Json, context);
                    await SeedRepository<IdentityUser>.SeedUsers(userManager, roleManager);
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<InventoryDBContext>();
                logger.LogError(ex.Message);
                logger.LogError(ex.InnerException.Message);
            }
        }
    }


    internal static class SeedRepository<T> where T : class
    {
        private static DbSet<T> objSet;
        internal static async Task AddFromJson(string jsonData, InventoryDBContext context)
        {
            var objectList = JsonConvert.DeserializeObject<List<T>>(jsonData);
            Console.Write($"Creating {objectList.Count()} records{Environment.NewLine}");

            objSet = context.Set<T>();
            foreach (var item in objectList)
            {
                await objSet.AddAsync(item);
                await context.SaveChangesAsync();
            }
        }

        internal static async Task SeedUsers(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            // Create Roles
            IdentityRole role = new IdentityRole()
            {
                Name = UserSeed.RoleName,
            };
            await roleManager.CreateAsync(role);

            // Create users
            var objectList = JsonConvert.DeserializeObject<List<TempUser>>(UserSeed.UsersJson);
            foreach (var item in objectList)
            {
                IdentityUser user = new IdentityUser
                {
                    Email = item.Email,
                    UserName = item.Email
                };
                await userManager.CreateAsync(user, item.Password);

            }

            // Add UserRole
            var userForAdminRole = await userManager.FindByEmailAsync("admin@test.com");
            await userManager.AddClaimAsync(userForAdminRole, new Claim(ClaimTypes.Role, UserSeed.RoleName));
        }

        struct TempUser
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}
