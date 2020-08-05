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
using System.Reflection;
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
            Console.WriteLine(Environment.CurrentDirectory);
            var configurationBuilder = new ConfigurationBuilder()
                .SetBasePath(Environment.CurrentDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            var _config = configurationBuilder.Build();

            var connectionString = _config.GetConnectionString("DefaultConnection");
            optionsBuilder.UseNpgsql(connectionString);
            optionsBuilder.UseLoggerFactory(MyLoggerFactory)  //tie-up DbContext with LoggerFactory object
                .EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // How to set it up: 
            // https://www.learnentityframeworkcore.com/conventions/one-to-many-relationship

            modelBuilder.Entity<EmployeeDevice>()
                .HasKey(x => new { x.EmployeeId, x.DeviceId });

            modelBuilder.Entity<EmployeeDevice>()
                .Ignore(x => x.Id);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>()
                .HasMany(c => c.Devices)
                .WithOne(d => d.Category)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Maker>()
                .HasMany(m => m.Devices)
                .WithOne(d => d.Maker)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
