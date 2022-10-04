export interface IndicatorDataSet {
  Unit: string;
  PeriodFromYear: any;
  PeriodFromMonth: any;
  PeriodToYear: any;
  PeriodToMonth: any;
  Comment?: string;
  OID?: number;
}

export interface PrimaryDataField {
  DependendonPrimaryDataFieldOid: number;
  DefaultUOM: string;
  Guidance: string;
  IndicatorNotesCount: number;
  Name: string;
  PrimaryDataFieldOid: number;
  PrimaryDataValue: PrimaryDataValue[];
  CommodityOid: number;

}

export interface PrimaryDataValue {
  ValueOid: number;
  DataSetOid: number,
  Value: any;
}


export interface IndicatorDatasetList {
  IsChecked?: boolean;
  OID: number;
  PeriodFrom: string;
  PeriodFromYear?: string;

}
