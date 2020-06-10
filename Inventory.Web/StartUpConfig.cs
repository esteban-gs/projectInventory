using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Inventory.Web
{
    public static class StartUpConfig
    {
    internal static string DbServer { get; set; }
    internal static string DbPort { get; set; }
    internal static string DbUser { get; set; }
    internal static string DbPassword { get; set; }
    internal static string DbDatabase { get; set; }

        public static void ConfigureConnectionStrings(this IServiceCollection services, IConfiguration config)
        {
            var server = config["DBServer"] ?? "sql-server";
            var port = config["DBPort"] ?? "1433";
            var user = config["DBUser"] ?? "SA";
            var password = config["DBPassword"] ?? "!Passw0rd";
            var database = config["Database"] ?? "Inventory";
        }
    }
}