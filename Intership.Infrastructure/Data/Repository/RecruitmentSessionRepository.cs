﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Application.Interfaces;
using Intership.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Intership.Infrastructure.Data.Repository
{
    public class RecruitmentSessionRepository : IRecruitmentSessionRepository
    {
        private readonly IntershipDbContext _context;
        public RecruitmentSessionRepository(IntershipDbContext context)
        {
            _context = context;
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



        // Implement the method to get the active recruitment session
        public async Task<RecruitmentSession?> GetActiveRecruitmentSessionAsync(DateTime now)
        {
            var utcNow = now.ToUniversalTime(); // Ensure we're comparing using UTC time
            Console.WriteLine($"Current UTC Time: {utcNow}");

            var activeSession = await _context.RecruitmentSessions
                .Where(rs => rs.DateCreated <= utcNow && rs.DateEnded >= utcNow)
                .OrderByDescending(rs => rs.DateCreated)
                .FirstOrDefaultAsync();

            if (activeSession != null)
            {
                Console.WriteLine($"Active Session Found: {activeSession.Name}, DateCreated: {activeSession.DateCreated}, DateEnded: {activeSession.DateEnded}");
            }
            else
            {
                Console.WriteLine("No active recruitment session found.");
            }

            return activeSession;
        }







        // i added this dont forget it
        public async Task CloseActiveSessionsAsync()
        {
            var activeSessions = await _context.RecruitmentSessions
                .Where(rs => rs.DateEnded == null || rs.DateEnded > DateTime.UtcNow)
                .ToListAsync();

            foreach (var session in activeSessions)
            {
                session.DateEnded = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
        }


    }
}
