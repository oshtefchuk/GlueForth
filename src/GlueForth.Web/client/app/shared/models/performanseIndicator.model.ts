export interface PerformanceIndicator {
  Characteristic: number;
  Characteristic1?: any;
  CommodityIndicatorGuidances?: any;
  DataField?: any;
  GCRecord?: any;
  IndicatorValues?: any[];
  Markup?: any;
  OID: number;
  OptimisticLockField?: number;
  PrimaryDataField?: any;
  ShortTitle: string;
  Title: string;
  Version?: any;
  Version1?: any;
}

export interface MonthlyValuesPayload {
  PrimaryDataValue: number;
  MonthNumber: number;
  Value: number
}

