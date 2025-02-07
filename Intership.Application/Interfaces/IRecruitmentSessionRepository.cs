using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Intership.Domain.Entities;

namespace Intership.Application.Interfaces
{
    public interface IRecruitmentSessionRepository
    {
        // RecruitmentSession CRUD operations
        Task<RecruitmentSession> GetRecruitmentSessionByIdAsync(int id);
        Task<List<RecruitmentSession>> GetAllRecruitmentSessionsAsync();
        Task AddRecruitmentSessionAsync(RecruitmentSession recruitmentSession);
        Task UpdateRecruitmentSessionAsync(RecruitmentSession recruitmentSession);
        Task DeleteRecruitmentSessionAsync(int id);




        // New method to get active recruitment session
        Task<RecruitmentSession?> GetActiveRecruitmentSessionAsync(DateTime now);




        // Method to close active sessions
        Task CloseActiveSessionsAsync();

    }

}
