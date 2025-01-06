using MediatR;
using Intership.Application.DTOs;

namespace Intership.Application.Queries.GetInternById
{
    public class GetInternByIdQuery : IRequest<InternDto>
    {
        public int Id { get; set; }
    }
}
