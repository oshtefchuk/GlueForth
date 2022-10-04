using System;
using System.Collections.Generic;
using System.Configuration;

namespace BlueNorth.WebApi
{
    public class UserDTO
    {
        public const string MOBILE_PHONE_TYPE = "Mobile";
        public const string CELLULAR_PHONE_TYPE = "Phone";

        public UserDTO()
        {
            
        }
        public UserDTO(User user)
        {
            Oid = user.Oid;
            PermissionPolicyUser = new PermissionPolicyUserDTO
            {
                Oid = user.PermissionPolicyUser.Oid,
                UserName = user.PermissionPolicyUser.UserName,
                UsersRoles = new List<UsersRolesDTO>()
            };
            foreach (var userRole in user.PermissionPolicyUser.PermissionPolicyUserUsers_PermissionPolicyRoleRoles)
                PermissionPolicyUser.UsersRoles.Add(new UsersRolesDTO
                {
                    Role = new RoleDTO {Name = userRole.PermissionPolicyRole.Name}
                });
            var person = user.Person1;
            if (person != null)
            {
                Person1 = new PersonDTO
                {
                    Oid = person.Oid,
                    Birthday = person.Birthday,
                    Email = person.Email,
                    FirstName = person.FirstName,
                    LastName = person.LastName
                };
                var address = person.Party.Address;
                Person1.Party = new PartyDTO
                {
                    Oid = person.Party.Oid,
                    PhoneNumbers = new List<PhoneNumber>(),
                    Address = address == null
                        ? null
                        : new AddressDTO
                        {
                            Oid = address.Oid,
                            City = address.City,
                            Street = address.Street,
                            Country = address.Country,
                            StateProvince = address.StateProvince
                        }
                };
                foreach (var phone in person.Party.PhoneNumbers)
                    Person1.Party.PhoneNumbers.Add(new PhoneNumber
                    {
                        Oid = phone.Oid,
                        Number = phone.Number,
                        PhoneType = phone.PhoneType
                    });
            }

            if (user.Organisation != null) Organisation = user.Organisation;
            CurrentUnitId = user.Unit?.Oid.ToString() ?? string.Empty;
            DisabledAnswerVariantText = ConfigurationManager.AppSettings["DisabledAnswerVariantText"];
            OrganisationOid = user.Organisation?.ToString() ?? string.Empty;
            UnitsCountLimit = user.Organisation1?.UnitsCountLimit.GetValueOrDefault() ?? 0;
            AcceptedTermsConditions = user.AcceptedTermsConditions.GetValueOrDefault();
        }

        public Guid Oid { get; set; }
        public PermissionPolicyUserDTO PermissionPolicyUser { get; set; }

        public PersonDTO Person1 { get; set; }
        public Guid? Organisation { get; set; }

        public string CurrentUnitId { get; set; }

        public DateTime LastModified { get; set; }

        public string DisabledAnswerVariantText { get; set; }
        public string OrganisationOid { get; set; }

        public int UnitsCountLimit { get; set; }

        public bool AcceptedTermsConditions { get; set; }
}
}