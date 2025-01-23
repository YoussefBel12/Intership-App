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

   
    }
}

