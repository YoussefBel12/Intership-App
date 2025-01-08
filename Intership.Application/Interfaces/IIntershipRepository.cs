using System.Collections.Generic;
using System.Threading.Tasks;
using Intership.Application.DTOs;

using Intership.Domain.Entities;

namespace Intership.Application.Interfaces
{
    public interface IIntershipRepository
    {
    /*    // Intern CRUD operations
        Task<Intern> GetInternByIdAsync(int id);
        Task<List<Intern>> GetAllInternsAsync();
        Task AddInternAsync(Intern intern);
        Task UpdateInternAsync(Intern intern);
        Task DeleteInternAsync(int id);

        // SuperVisor CRUD operations
        Task<SuperVisor> GetSuperVisorByIdAsync(int id);
        Task<List<SuperVisor>> GetAllSuperVisorsAsync();
        Task AddSuperVisorAsync(SuperVisor superVisor);
        Task UpdateSuperVisorAsync(SuperVisor superVisor);
        Task DeleteSuperVisorAsync(int id);

        // RecruitmentSession CRUD operations
        Task<RecruitmentSession> GetRecruitmentSessionByIdAsync(int id);
        Task<List<RecruitmentSession>> GetAllRecruitmentSessionsAsync();
        Task AddRecruitmentSessionAsync(RecruitmentSession recruitmentSession);
        Task UpdateRecruitmentSessionAsync(RecruitmentSession recruitmentSession);
        Task DeleteRecruitmentSessionAsync(int id);

        // Candidate CRUD operations
        Task<Candidate> GetCandidateByIdAsync(int id);
        Task<List<Candidate>> GetAllCandidatesAsync();
        Task AddCandidateAsync(Candidate candidate);
        Task UpdateCandidateAsync(Candidate candidate);
        Task DeleteCandidateAsync(int id);

        // User CRUD operations
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
        Task<List<User>> GetAllUsersAsync();
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id); */

        // Summary method
        Task<SummaryDto> GetSummaryForCurrentYearAsync();

     /*   // Authentication methods
        Task<User> AuthenticateAsync(string email, string password);
        Task<bool> ChangePasswordAsync(int userId, string newPassword);

        */
    }
}
