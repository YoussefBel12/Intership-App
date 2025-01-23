using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Application.Interfaces;
using Intership.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Intership.Infrastructure.Data.Repository
{
    public class CandidateRepository : ICandidateRepository
    {
        private readonly IntershipDbContext _context;
        public CandidateRepository(IntershipDbContext context)
        {
            _context = context;
        }
        // Candidate CRUD operations
        public async Task<Candidate> GetCandidateByIdAsync(int id)
        {
            return await _context.Candidates.FindAsync(id);
        }

        public async Task<List<Candidate>> GetAllCandidatesAsync()
        {
            //  return await _context.Candidates.ToListAsync();
            return await _context.Candidates
        .Include(c => c.RecruitmentSession) // Eagerly load RecruitmentSession
         .ToListAsync();
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

    }
}
