using Microsoft.EntityFrameworkCore;

namespace CamelRegistry.Classes
{
    public class CamelDbContext : DbContext
    {
        public CamelDbContext(DbContextOptions<CamelDbContext> options) : base(options) { }
        public DbSet<Camel> Camels => Set<Camel>();
    }
}
