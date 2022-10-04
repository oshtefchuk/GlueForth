export class Standard {
  OID?: number;
  Reference: string;
  Title: string;
  ShortTitle: string;
  Description: string;
  Edition: string;
  GCRecord?: any;
  OptimistiLockField?: number;
  Version?: any;
  StandardChapters?: any[];
  StandardStandards_CommodityCommodities?: any[];
}

export class CurrentUnitStatuses {
  Title: string;
  Reference: string;
  Description: string;
  Status: string;
}
