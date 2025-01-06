using Microsoft.EntityFrameworkCore;
using Intership.Domain.Entities;

namespace Intership.Infrastructure.Data
{
    public class IntershipDbContext : DbContext
    {
        public IntershipDbContext(DbContextOptions<IntershipDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RecruitmentSession> RecruitmentSessions { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Intern> Interns { get; set; }
        public DbSet<SuperVisor> SuperVisors { get; set; }
        public DbSet<InternRecruitmentSession> InternRecruitmentSessions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<InternRecruitmentSession>()
                .HasKey(irs => new { irs.InternId, irs.RecruitmentSessionId });

            modelBuilder.Entity<InternRecruitmentSession>()
                .HasOne(irs => irs.Intern)
                .WithMany(i => i.InternRecruitmentSessions)
                .HasForeignKey(irs => irs.InternId);

            modelBuilder.Entity<InternRecruitmentSession>()
                .HasOne(irs => irs.RecruitmentSession)
                .WithMany(rs => rs.InternRecruitmentSessions)
                .HasForeignKey(irs => irs.RecruitmentSessionId);
        }
    }
}
