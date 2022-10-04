using System;

namespace BlueNorth.WebApi
{
    public class PersonDTO
    {
        public PersonDTO()
        {
            
        }
        public Guid Oid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public string Email { get; set; }

        public PartyDTO Party { get; set; }
    }
}
