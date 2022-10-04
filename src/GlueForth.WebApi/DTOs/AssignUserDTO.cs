using System;
using System.Linq;

namespace BlueNorth.WebApi
{
    public class AssignUserDTO
    {
        public AssignUserDTO()
        {
            
        }

        public AssignUserDTO(User user)
        {
            FirstName = user.Person1.FirstName;
            LastName = user.Person1.LastName;
            Email = user.Person1.Email;
            Oid = user.Oid;
        }

        public Guid Oid { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string CurrentUnitId { get; set; }

        public bool IsUserAdmin { get; set; }
    }
}