using System;
using System.Collections.Generic;

namespace BlueNorth.WebApi
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
