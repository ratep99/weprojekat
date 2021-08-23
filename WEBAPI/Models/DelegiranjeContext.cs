using Microsoft.EntityFrameworkCore;

namespace WEBAPI.Models
{
    public class DelegiranjeContext : DbContext
    {
        public DbSet<Kolo> Kolo { get; set; }
        public DbSet<SluzbenoLice> SluzbenoLice { get; set; }
        public DbSet<Utakmica> Utakmica { get; set; }

        public DelegiranjeContext(DbContextOptions options): base(options)
        {
            
        }


    }
}