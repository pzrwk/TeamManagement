using Microsoft.EntityFrameworkCore;
using TeamManagement.Domain.Entities;

namespace TeamManagement.Infrastructure
{
    public class TeamManagementDbContext : DbContext
    {
        public TeamManagementDbContext(DbContextOptions<TeamManagementDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.UseSerialColumns();
        }

        public DbSet<Member?> Members { get; set; }
    }
}
