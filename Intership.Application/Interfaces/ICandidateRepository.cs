using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Domain.Entities;

namespace Intership.Application.Interfaces
{
    public interface ICandidateRepository
    {
        // Candidate CRUD operations
        Task<Candidate> GetCandidateByIdAsync(int id);
        Task<List<Candidate>> GetAllCandidatesAsync();
        Task AddCandidateAsync(Candidate candidate);
        Task UpdateCandidateAsync(Candidate candidate);
        Task DeleteCandidateAsync(int id);
    }
}
