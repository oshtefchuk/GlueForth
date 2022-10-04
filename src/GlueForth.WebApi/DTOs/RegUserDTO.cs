using System;
using System.Linq;

namespace BlueNorth.WebApi
{
    public class RegUserDTO
    {
        public RegUserDTO()
        {
            
        }
        public RegUserDTO(User user)
        {
            UserName = user.PermissionPolicyUser.UserName;
            if (user.Person1 != null)
            {
                FirstName = user.Person1.FirstName;
                LastName = user.Person1.LastName;
                Email = user.Person1.Email;
            }

            OrganisationOid = user.Organisation1?.Oid.ToString() ?? string.Empty;
            Roles = user.PermissionPolicyUser.PermissionPolicyUserUsers_PermissionPolicyRoleRoles
                .Select(x => x.PermissionPolicyRole.Name).ToArray();
            Oid = user.Oid;
            CurrentUnitId = user.Unit?.Oid.ToString() ?? string.Empty;
            CountryId = user.Organisation1?.Organization.Party.Address.Country.ToString();
            UnitsCountLimit = user.Organisation1?.UnitsCountLimit;
            AcceptedTermsConditions = user.AcceptedTermsConditions.GetValueOrDefault();
            Password = user.PermissionPolicyUser.StoredPassword;
        }

        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string[] Roles { get; set; }
        public string OrganisationOid { get; set; }
        public Guid Oid { get; set; }
        public string Mobile { get; set; }
        public DateTime? Birthday { get; set; }
        public string CurrentUnitId { get; set; }

        public string CountryId { get; set; }

        public DateTime? LastModified { get; set; }

        public int? UnitsCountLimit { get; set; }

        public bool AcceptedTermsConditions { get; set; }
    }
}