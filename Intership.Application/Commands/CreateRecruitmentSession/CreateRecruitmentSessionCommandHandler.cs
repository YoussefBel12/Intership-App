﻿using System.Threading;
using System.Threading.Tasks;
using Intership.Application.Interfaces;
using Intership.Domain.Entities;
using MediatR;

namespace Intership.Application.Commands.CreateRecruitmentSession
{
    public class CreateRecruitmentSessionCommandHandler : IRequestHandler<CreateRecruitmentSessionCommand, int>
    {
        private readonly IRecruitmentSessionRepository _repository;

        public CreateRecruitmentSessionCommandHandler(IRecruitmentSessionRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(CreateRecruitmentSessionCommand request, CancellationToken cancellationToken)
        {
            var session = new RecruitmentSession
            {
                Name = request.Name,
                Year = request.Year,
                Comment = request.Comment,
                DateCreated = DateTime.Now,
                DateEnded = DateTime.Now.AddMonths(1)
            };
            await _repository.AddRecruitmentSessionAsync(session);
            return session.Id;
        }
    }
}

