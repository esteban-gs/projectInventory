using Core.Entities;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure.Data
{
    public class InventoryContextSeed
    {
        public static async Task SeedAsync(InventoryDBContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                context.Database.EnsureCreated();

                if (!context.Devices.Any())
                {

                    await MigrationRepository<Category>.JsonToList("deviceCategory", context);
                    await MigrationRepository<Maker>.JsonToList("deviceMakers", context);
                    await MigrationRepository<Device>.JsonToList("devices", context);
                    await MigrationRepository<Employee>.JsonToList("employees", context);
                    await MigrationRepository<EmployeeDevice>.JsonToList("employeesDevices", context);
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


    internal static class MigrationRepository<T> where T : class
    {
        static DbSet<T> objSet;
        internal static async Task JsonToList(string fileName, InventoryDBContext context)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };

            // var rootPath = Directory.GetParent(Directory.GetCurrentDirectory()).ToString();
            var rootPath = Environment.CurrentDirectory;
            Console.WriteLine("______________+++++++_");
            Console.WriteLine(rootPath);

            var deviceDataSource = File
                       .ReadAllText($"{rootPath}/Infrastructure/{fileName}.json");

            var objectList = JsonSerializer.Deserialize<List<T>>(deviceDataSource, options);
            Console.Write($"Creating {objectList.Count()} records{Environment.NewLine}");
            
            // foreach (var devic in objectList)
            // {
            //     PropertyInfo[] properties = devic.GetType().GetProperties();
            //     foreach (var prop in properties)
            //     {
            //         Console.WriteLine($"{prop.Name}: , {prop.GetValue(devic, null)}");
            //     }
            //     Console.Write($"{devic.GetType().GetProperties()}{Environment.NewLine}");
            // }

            objSet = context.Set<T>();
            foreach (var item in objectList)
            {
                await objSet.AddAsync(item);
                await context.SaveChangesAsync();
            }
        }
    }
}
