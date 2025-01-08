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
    public class UserRepository : IUserRepository
    {
        private readonly IntershipDbContext _context;
        public UserRepository(IntershipDbContext context)
        {
            _context = context;
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
        }

    }
}
