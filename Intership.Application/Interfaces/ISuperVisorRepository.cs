using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Domain.Entities;

namespace Intership.Application.Interfaces
{
    public interface ISuperVisorRepository
    {
        Task<SuperVisor> GetSuperVisorByIdAsync(int id);
        Task<List<SuperVisor>> GetAllSuperVisorsAsync();
        Task AddSuperVisorAsync(SuperVisor superVisor);
        Task UpdateSuperVisorAsync(SuperVisor superVisor);
        Task DeleteSuperVisorAsync(int id);
    }
}
