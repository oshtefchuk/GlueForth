export class SpaDatasetForChart {
  OID: number;
  Grade: string;
  AnsweredPercentage: number;
  State: number
}

export interface SpaDataSetLitePieChart {
  state: string;
  value: number;
}

export interface  SpaDataSetByDimentionsBarChart {
  OID: number;
  ShortTitle: string;
  UnAnsweredQuestionsCount: number;
}
export interface DataForBarChart {
  OID: number;
  ShortTitle: string;
  UnAnsweredQuestionsCount?: number;
  AnsweredPercentage: number;
}

export enum SpaDataSetState {
  NotStarted = 0, InProgress = 1, Completed = 2
}

