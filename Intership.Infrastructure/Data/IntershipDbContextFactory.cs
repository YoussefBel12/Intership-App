using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Intership.Infrastructure.Data
{
    public class IntershipDbContextFactory : IDesignTimeDbContextFactory<IntershipDbContext>
    {
        public IntershipDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<IntershipDbContext>();

            // Replace with your actual connection string
            optionsBuilder.UseSqlServer("Server=TOMMY\\SQLEXPRESS;Database=IntershipDb;Trusted_Connection=True;TrustServerCertificate=True;");

            return new IntershipDbContext(optionsBuilder.Options);
        }
    }
}



