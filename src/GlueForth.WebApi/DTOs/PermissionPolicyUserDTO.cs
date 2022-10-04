using System;
using System.Collections.Generic;

namespace BlueNorth.WebApi
{
    public class PermissionPolicyUserDTO
    {
        public Guid Oid { get; set; }
        public string UserName { get; set; }
        public string StoredPassword { get; set; }

        public ICollection<UsersRolesDTO> UsersRoles { get; set; }
    }
}
