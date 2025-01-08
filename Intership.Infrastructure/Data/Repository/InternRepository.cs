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
    public class InternRepository : IInternRepository
    {
        private readonly IntershipDbContext _context;
        public InternRepository(IntershipDbContext context)
        {
            _context = context;
        }

        // Intern CRUD operations
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

    }
}
