using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Text;
using System.Text.Json;

namespace Infrastructure.Data
{
    public class InventoryDBContext : DbContext
    {
        public static readonly ILoggerFactory MyLoggerFactory
            = LoggerFactory.Create(builder =>
            {
                builder
            .AddFilter((category, level) =>
                category == DbLoggerCategory.Database.Command.Name
                && level == LogLevel.Information)
            .AddConsole();
            });
        public InventoryDBContext()
        {
        }

        public DbSet<Device> Devices { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Maker> Makers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeDevice> EmployeesDevices { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var rootPath = Directory.GetParent(Directory.GetCurrentDirectory()).ToString();

            var configurationBuilder = new ConfigurationBuilder()
                .SetBasePath($"{rootPath}/Inventory.Web")
                .AddJsonFile("appsettings.json");

            var _config = configurationBuilder.Build();

            var connectionString = _config.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlServer(connectionString);
            optionsBuilder.UseLoggerFactory(MyLoggerFactory)  //tie-up DbContext with LoggerFactory object
                .EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeDevice>()
                .HasKey(x => new { x.EmployeeId, x.DeviceId });
            modelBuilder.Entity<EmployeeDevice>()
                .Ignore(x => x.Id);
            base.OnModelCreating(modelBuilder);
        }
    }
}
