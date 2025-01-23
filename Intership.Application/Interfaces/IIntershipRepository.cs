using System.Collections.Generic;
using System.Threading.Tasks;
using Intership.Application.DTOs;

using Intership.Domain.Entities;

namespace Intership.Application.Interfaces
{
    public interface IIntershipRepository
    {
    

        // Summary method
        Task<SummaryDto> GetSummaryForCurrentYearAsync();

   
    }
}
