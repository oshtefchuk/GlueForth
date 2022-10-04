using System;

namespace BlueNorth.WebApi
{
    public class AddressDTO
    {
        public AddressDTO()
        {
            
        }
        public Guid Oid { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string StateProvince { get; set; }
        public string ZipPostal { get; set; }
        public Guid? Country { get; set; }
    }
}
