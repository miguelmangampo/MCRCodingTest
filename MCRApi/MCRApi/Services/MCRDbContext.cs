
using Microsoft.EntityFrameworkCore;
using MCRApi.Entities;

namespace MCRApi.Services
{
    public class MCRDbContext : DbContext
    {
        public DbSet<Users> Users { get; set; }

        public MCRDbContext(DbContextOptions<MCRDbContext> options = null) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
