using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Text;

namespace Infrastructure.Data
{
    public class InventoryDBContext : DbContext
    {
        private readonly IConfiguration _config;
        public InventoryDBContext()
        {
        }

        public DbSet<Device> Devices { get; set; }
        public DbSet<DeviceCategory> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var rootPath = Directory.GetParent(Directory.GetCurrentDirectory()).ToString();

            var configurationBuilder = new ConfigurationBuilder()
                .SetBasePath($"{rootPath}/Inventory.Web")
                .AddJsonFile("appsettings.json");

            var _config = configurationBuilder.Build();

            var connectionString = _config.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
