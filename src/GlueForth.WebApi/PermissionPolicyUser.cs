//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BlueNorth.WebApi
{
    using System;
    using System.Collections.Generic;
    
    public partial class PermissionPolicyUser
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PermissionPolicyUser()
        {
            this.PermissionPolicyUserUsers_PermissionPolicyRoleRoles = new HashSet<PermissionPolicyUserUsers_PermissionPolicyRoleRoles>();
        }
    
        public System.Guid Oid { get; set; }
        public string StoredPassword { get; set; }
        public Nullable<bool> ChangePasswordOnFirstLogon { get; set; }
        public string UserName { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> OptimisticLockField { get; set; }
        public Nullable<int> GCRecord { get; set; }
        public Nullable<int> ObjectType { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PermissionPolicyUserUsers_PermissionPolicyRoleRoles> PermissionPolicyUserUsers_PermissionPolicyRoleRoles { get; set; }
        public virtual XPObjectType XPObjectType { get; set; }
        public virtual User User { get; set; }
    }
}
