using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Domain.Entities;

namespace Intership.Application.Interfaces
{
    public interface IInternRepository
    {
        // Intern CRUD operations
        Task<Intern> GetInternByIdAsync(int id);
        Task<List<Intern>> GetAllInternsAsync();
        Task AddInternAsync(Intern intern);
        Task UpdateInternAsync(Intern intern);
        Task DeleteInternAsync(int id);
    }
}
