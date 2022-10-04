export interface Characteristic {
 CommodityCategory: any;
 Description: any;
 Dimension: number;
 GuidanceText: string;
 OID: number;
 OrganisationType: any;
 Principle: number;
 PrincipleGroup: any;
 QuestionGroup: any;
 Reference: string;
 ShortTitle: string;
 Summary: string;
 Title: string;
 }

export enum CharacteristicStatus {
  OFF_THE_RADAR = 0,
  DABBLING,
  GOOD_FORTUNE,
  MAKING_REPARATIONS,
  TENTATIVE_ENGAGEMENT,
  OVER_STRETCHED,
  READY_TO_START,
  WELL_UNDERWAY,
  FULFILLED
}

