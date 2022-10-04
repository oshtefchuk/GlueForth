export class User {
  UserName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Country: any;
  TelephoneNumber: string;
  MobileNumber: string;
  OldPassword: string;
  NewPassword: string;

}

export class UserInfo {
  FirstName: string;
  LastName: string;
  Mobile: string;
  Oid: string;
  OrganisationOid: string;
  Password: string;
  Roles: string[];
  UserName: string;
  AcceptedTermsConditions: boolean;
}

export class UserLight {
  CurrentUnitId: any;
  Email: string;
  FirstName: string;
  LastName: string;
  Mobile: string;
  Oid: string;
  OrganisationOid: any;
  Password: string;
  Phone: string;
  Roles: string[];
  UserName: string;
}

export class UserFull {
  Oid: string;
  PermissionPolicyUser: PermissionPolicyUser;
  Person1: Person;
  Organisation: any;
  CurrentUnitId: string;
  AcceptedTermsConditions: boolean;
}

export class PermissionPolicyUser {
  Oid: string;
  UserName: string;
  StoredPassword: string;
  UsersRoles: UserRole[];
}

export class UserRole {
  Role: {
    Name: string;
  }
}

export class Person {
   Oid: string;
   FirstName: string;
   LastName: string;
   MiddleName: string;
   Birthday : string;
   Email : string;
   Party: Party;
}

export class Party {
  PhoneNumbers: PhoneNumbers[];
  Address: Address;
  Oid: string;
}
export class PhoneNumbers{
   Oid: string;
   Number: string;
   Party: any;
   PhoneType: string;
   OptimisticLockField: any;
   GCRecord: any;
   Party1: any;
}

export class Address {
 Oid: string;
 Street: string;
 City: string;
 StateProvince: string;
 ZipPostal: string;
 Country: string;
}

export class AssignUserUserToUnit {
  CurrentUnitId: string;
  FirstName: string;
  LastName: string;
  Email: string;
}


