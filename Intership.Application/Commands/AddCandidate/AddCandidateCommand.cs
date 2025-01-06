using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using MediatR;

namespace Intership.Application.Commands.AddCandidate
{
    public class AddCandidateCommand : IRequest<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string School { get; set; }
        public string Level { get; set; }
        public string CvFilePath { get; set; }
        public int RecruitmentSessionId { get; set; }
    }
}


