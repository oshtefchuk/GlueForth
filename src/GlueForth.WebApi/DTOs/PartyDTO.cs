using System;
using System.Collections.Generic;

namespace GlueForth.WebApi
{
    public class PartyDTO
    {
        public PartyDTO()
        {
            
        }
        public ICollection<PhoneNumber> PhoneNumbers { get; set; }
        public AddressDTO Address { get; set; }
        public Guid Oid { get; set; }
    }
}
