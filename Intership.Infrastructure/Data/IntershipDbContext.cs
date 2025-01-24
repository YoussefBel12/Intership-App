using Microsoft.EntityFrameworkCore;
using Intership.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Intership.Infrastructure.Identity;

namespace Intership.Infrastructure.Data
{
    public class IntershipDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public IntershipDbContext(DbContextOptions<IntershipDbContext> options)
            : base(options)
        {
        }

       
        public DbSet<RecruitmentSession> RecruitmentSessions { get; set; }
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Intern> Interns { get; set; }
        public DbSet<SuperVisor> SuperVisors { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            base.OnModelCreating(modelBuilder);


            // One-to-many relationship: a RecruitmentSession can have many Candidates
            modelBuilder.Entity<Candidate>()
                .HasOne(c => c.RecruitmentSession)
                .WithMany(rs => rs.Candidates) // A RecruitmentSession has many Candidates
                .HasForeignKey(c => c.RecruitmentSessionId) // Foreign key in Candidate table
                .OnDelete(DeleteBehavior.Cascade); // Optional: Define cascade delete behavior
        
        /*
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
        */
        ////////////////
     //   modelBuilder.Entity<User>().ToTable("Users");
       //     modelBuilder.Entity<Role>().ToTable("Roles");

        }
    }
}
