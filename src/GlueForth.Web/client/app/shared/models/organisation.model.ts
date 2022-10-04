export class Organisation {
  Oid?: string;
  Organization: {
    Party: {
      Address: Address,
      PhoneNumbers: [
        {
          Number: string;
          PhoneType: string;
        }
        ],
    };
    FullName: string;
    Profile: string;
    Email: string;
    WebSite: string;
    Name: string;
  }
}

export class Address {
  Street: string;
  City: string;
  StateProvince: string;
  ZipPostal: string;
  Country: string;

}
