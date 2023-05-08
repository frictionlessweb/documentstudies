export interface User {
  name: string;
  email: string;
}

export interface DocumentStudyDocument {
  id: string;
  name: string;
  url: string;
}

interface QuestionBase {
  id: string;
  name: string;
}

export interface FreeInputQuestion extends QuestionBase {
  type: 'FREE_INPUT'
}

// TODO: For now, we only support free text fields, but we'll eventually
// extend the app to work with multiple choice fields and other such
// niceties.
export type Question = FreeInputQuestion;
