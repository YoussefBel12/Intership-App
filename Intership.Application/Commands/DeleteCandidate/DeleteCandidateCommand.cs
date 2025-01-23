using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace Intership.Application.Commands.DeleteCandidate
{
    public class DeleteCandidateCommand: IRequest<Unit>
    {
        public int Id { get; }

        public DeleteCandidateCommand(int id)
        {
            Id = id;
        }
    }
}
