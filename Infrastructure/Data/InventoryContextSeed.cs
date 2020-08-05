using Core.Entities;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Infrastructure.Data
{
    public class InventoryContextSeed
    { 
        public static async Task SeedAsync(
            InventoryDBContext context,
            ILoggerFactory loggerFactory
            )
        {
            try
            {
                context.Database.EnsureCreated();

                if (!context.Devices.Any())
                {
                    await MigrationRepository<Category>.JsonToList(DeviceCategorySeed.Json, context);
                    await MigrationRepository<Maker>.JsonToList(DeviceMakerSeed.Json, context);
                    await MigrationRepository<Device>.JsonToList(DeviceSeed.Json, context);
                    await MigrationRepository<Employee>.JsonToList(EmployeeSeed.Json, context);
                    await MigrationRepository<EmployeeDevice>.JsonToList(EmployeeDeviceSeed.Json, context);
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
        private static DbSet<T> objSet;
        internal static async Task JsonToList(string jsonData, InventoryDBContext context)
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
    }
}
