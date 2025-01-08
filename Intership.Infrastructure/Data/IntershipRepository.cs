using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Intership.Application.DTOs;

using Intership.Application.Interfaces;
using Intership.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Intership.Infrastructure.Data
{
    public class IntershipRepository : IIntershipRepository
    {
        private readonly IntershipDbContext _context;

        public IntershipRepository(IntershipDbContext context)
        {
            _context = context;
        }

      /*  // Intern CRUD operations
        public async Task<Intern> GetInternByIdAsync(int id)
        {
            return await _context.Interns.FindAsync(id);
        }

        public async Task<List<Intern>> GetAllInternsAsync()
        {
            return await _context.Interns.ToListAsync();
        }

        public async Task AddInternAsync(Intern intern)
        {
            intern.DateCreated = DateTime.Now; // Set DateCreated
            await _context.Interns.AddAsync(intern);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateInternAsync(Intern intern)
        {
            _context.Interns.Update(intern);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteInternAsync(int id)
        {
            var intern = await _context.Interns.FindAsync(id);
            if (intern != null)
            {
                _context.Interns.Remove(intern);
                await _context.SaveChangesAsync();
            }
        }

        // SuperVisor CRUD operations
        public async Task<SuperVisor> GetSuperVisorByIdAsync(int id)
        {
            return await _context.SuperVisors.FindAsync(id);
        }

        public async Task<List<SuperVisor>> GetAllSuperVisorsAsync()
        {
            return await _context.SuperVisors.ToListAsync();
        }

        public async Task AddSuperVisorAsync(SuperVisor superVisor)
        {
            await _context.SuperVisors.AddAsync(superVisor);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSuperVisorAsync(SuperVisor superVisor)
        {
            _context.SuperVisors.Update(superVisor);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSuperVisorAsync(int id)
        {
            var superVisor = await _context.SuperVisors.FindAsync(id);
            if (superVisor != null)
            {
                _context.SuperVisors.Remove(superVisor);
                await _context.SaveChangesAsync();
            }
        }

        // RecruitmentSession CRUD operations
        public async Task<RecruitmentSession> GetRecruitmentSessionByIdAsync(int id)
        {
            return await _context.RecruitmentSessions.FindAsync(id);
        }

        public async Task<List<RecruitmentSession>> GetAllRecruitmentSessionsAsync()
        {
            return await _context.RecruitmentSessions.OrderByDescending(rs => rs.DateCreated).ToListAsync();
        }

        public async Task AddRecruitmentSessionAsync(RecruitmentSession recruitmentSession)
        {
            await _context.RecruitmentSessions.AddAsync(recruitmentSession);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRecruitmentSessionAsync(RecruitmentSession recruitmentSession)
        {
            _context.RecruitmentSessions.Update(recruitmentSession);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRecruitmentSessionAsync(int id)
        {
            var recruitmentSession = await _context.RecruitmentSessions.FindAsync(id);
            if (recruitmentSession != null)
            {
                _context.RecruitmentSessions.Remove(recruitmentSession);
                await _context.SaveChangesAsync();
            }
        }

        // Candidate CRUD operations
        public async Task<Candidate> GetCandidateByIdAsync(int id)
        {
            return await _context.Candidates.FindAsync(id);
        }

        public async Task<List<Candidate>> GetAllCandidatesAsync()
        {
            return await _context.Candidates.ToListAsync();
        }

        public async Task AddCandidateAsync(Candidate candidate)
        {
            candidate.DateCreated = DateTime.Now; // Set DateCreated
            await _context.Candidates.AddAsync(candidate);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCandidateAsync(Candidate candidate)
        {
            _context.Candidates.Update(candidate);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCandidateAsync(int id)
        {
            var candidate = await _context.Candidates.FindAsync(id);
            if (candidate != null)
            {
                _context.Candidates.Remove(candidate);
                await _context.SaveChangesAsync();
            }
        }

        // User CRUD operations
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users
                 .Include(u => u.Role) // Ensure Role is included
                 .FirstOrDefaultAsync(u => u.Id == id);
            // .FindAsync(id);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users
                 .Include(u => u.Role) // Ensure Role is included
                .ToListAsync();
        }

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }*/
        // Summary method
        public async Task<SummaryDto> GetSummaryForCurrentYearAsync()
        {
            var currentYear = DateTime.Now.Year;

            var totalInterns = await _context.Interns.CountAsync(i => i.DateCreated.Year == currentYear);
            var totalCandidates = await _context.Candidates.CountAsync(c => c.DateCreated.Year == currentYear);
            var totalRecruitmentSessions = await _context.RecruitmentSessions.CountAsync(rs => rs.DateCreated.Year == currentYear);

            return new SummaryDto
            {
                TotalInterns = totalInterns,
                TotalCandidates = totalCandidates,
                TotalRecruitmentSessions = totalRecruitmentSessions
            };
        }

   /*     // Authentication methods
        public async Task<User> AuthenticateAsync(string email, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user != null && user.Password == password)
            {
                return user;
            }
            return null;
        }

        public async Task<bool> ChangePasswordAsync(int userId, string newPassword)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.Password = newPassword;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;


        } */
    }
}

