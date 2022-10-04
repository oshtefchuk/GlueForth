import {Commodity} from "./commodity.model";

export class UnitList {
  Oid: string;
  UnitType: UnitType['Name'];
  Organisation: string;
  UnitStructure: UnitStructure;
}

export class UnitInfo {
  Oid?: string;
  UnitName?: string;
  UnitTypeId?: any;
  UnitStructure?: any;
  ResponsibleName?: string;
  ResponsibleSurname?: string;
  ResponsibleEmail?: string;
  ResponsibleMobile?: string;
  ResponsiblePhone?: string;
  UnitCountryId?: any;
  LocationLongtitude?: any;
  LocationLattitude?: any;
  UnitCommodityId?: any;
  Suppliers?: any;
  Retailers?: any;
  Standards?: any;
  OrganisationId?: string;
  AssessmentType?: number;
  FrameworkId?: any;
  Commodities?: any[];
}

export class UnitType {
  GCRecord: string;
  Name: string;
  OID: number;
  OptimisticLockField: number;
  Version: string;
}

export enum UnitStructure {
  Independent = 0, Cooperative = 1
}
