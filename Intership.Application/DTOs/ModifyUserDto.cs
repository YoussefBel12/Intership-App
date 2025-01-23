using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Intership.Application.DTOs
{
    public class ModifyUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }  // <-- Add this line for role modification
        public string Password { get; set; }
    }
}
