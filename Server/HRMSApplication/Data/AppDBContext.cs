using HRMSApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace HRMSApplication.Data
{
    public class AppDBContext:DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options):base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Department> Departments { get; set; }

    }
}
