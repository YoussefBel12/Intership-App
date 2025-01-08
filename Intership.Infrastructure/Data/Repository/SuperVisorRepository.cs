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
    public class SuperVisorRepository : ISuperVisorRepository
    {
        private readonly IntershipDbContext _context;
        public SuperVisorRepository(IntershipDbContext context)
        {
            _context = context;
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

    }
}
