using System;
using System.Linq;

namespace BlueNorth.WebApi
{
    public class UnitDTO
    {
        public UnitDTO()
        {

        }
        public UnitDTO(Unit unit)
        {
            Oid = unit.Oid.ToString();
            UnitName = unit.Organization.Name;
            if (unit.UnitType != null) UnitTypeId = unit.UnitType.Value;
            if (unit.UnitStructure != null) UnitStructure = (int)unit.UnitStructure;
            if (unit.Person != null)
            {
                ResponsibleName = unit.Person.FirstName;
                ResponsibleSurname = unit.Person.LastName;
                ResponsibleEmail = unit.Person.Email;
                var phone = unit.Person.Party.PhoneNumbers.FirstOrDefault(x =>
                    x.PhoneType == UserDTO.MOBILE_PHONE_TYPE);
                if (phone != null) ResponsibleMobile = phone.Number;
                phone = unit.Person.Party.PhoneNumbers.FirstOrDefault(x => x.PhoneType == UserDTO.CELLULAR_PHONE_TYPE);
                if (phone != null) ResponsiblePhone = phone.Number;
            }

            UnitCountryId = unit.Organization.Party.Address?.Country.ToString();
            LocationLattitude = unit.LocationLattitude ?? -1;
            LocationLongtitude = unit.LocationLongtitude ?? -1;
            UnitCommodityId = unit.PrimaryCommodity ?? -1;
            OrganisationId = unit.Organisation.ToString();
            AssessmentType = unit.CurrentAssessmentType ?? -1;
            FrameworkId = unit.PrimaryFramework ?? -1;
            Suppliers = unit.UnitUnits_SupplierSuppliers.Where(x=> !x.Supplier.GCRecord.HasValue).Select(x => x.Supplier.OID).ToArray();
            Retailers = unit.UnitUnits_RetailerRetailers.Where(x => !x.Retailer.GCRecord.HasValue).Select(x => x.Retailer.OID).ToArray();
            Standards = unit.UnitUnits_StandardStandards.Where(x => !x.Standard.GCRecord.HasValue).Select(x => x.Standard.OID).ToArray();
            Commodities = unit.UnitUnits_CommodityCommodities.Where(x => !x.Commodity.GCRecord.HasValue).Select(x => x.Commodity.OID).ToArray();
            SecondaryCommodities = unit.UnitSecondaryUnits_CommoditySecondaryCommodities.Select(x => x.Commodity.OID).ToArray();
        }

        public string Oid { get; set; }
        public string UnitName { get; set; }
        public int UnitTypeId { get; set; }
        public int UnitStructure { get; set; }
        public string ResponsibleName { get; set; }
        public string ResponsibleSurname { get; set; }
        public string ResponsibleEmail { get; set; }
        public string ResponsibleMobile { get; set; }
        public string ResponsiblePhone { get; set; }
        public string UnitCountryId { get; set; }
        public double LocationLongtitude { get; set; }
        public double LocationLattitude { get; set; }
        public int UnitCommodityId { get; set; }
        public int? AssessmentType { get; set; }
        public int FrameworkId { get; set; }
        public string OrganisationId { get; set; }

        public bool IsUserAdmin { get; set; } //is this Unit creaqted by current user

        public int[] Suppliers { get; set; }

        public int[] Retailers { get; set; }
        public int[] Standards { get; set; }
        public int[] Commodities { get; set; }
        public int[] SecondaryCommodities { get; set; }

        public Guid AssignToUserOid { get; set; }

    }


}