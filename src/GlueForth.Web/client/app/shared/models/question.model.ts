export interface QuestionsWithAnswers {
  question: string;
  answer: number;
  questionId: string;
}

export interface AnswerToPost {
  Unit: any;
  User: any;
  AnswerText: any;
  Question: any;
  Choice?: any;
}

export interface Question {
  Oid: number;
  QuestionOid: number;
  Title: string;
  QuestionTitle: string;
  AnswerOid: number;
  AnswerChoise: number;
  AnswerText: number,
  IsGuidanceExists: boolean;
  GuidanceText: string;
  NoAnswerGuidance: string;
  PartiallyAnswerGuidance: string;
  UnknownAnswerGuidance: string;
  YesAnswerGuidance: string;
  SpaAssessment: number;
  SpaUnit: string;
}

export interface QuestionNote {
  Attachments: Attachment[];
  Note: string;
  OID: number;
  Question?: number;
}

export interface QuestionNoteAttachment {
  AnswerNoteOID: number;
  FileName: string;
  File: Attachment[]
}

export interface Attachment {
  FileName: string;
  OID: number
}
