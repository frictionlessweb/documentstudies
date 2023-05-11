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
  instructions: string;
}

export const QUESTION_TYPES = {
  FreeResponseQuestion: {
    order: 0,
    value: "FreeResponseQuestion",
    display: "Free Response",
  },
} as const;

export const QUESTION_TYPE_LIST = Object.keys(QUESTION_TYPES)
  .sort((a, b) => {
    const first = a as keyof typeof QUESTION_TYPES;
    const second = b as keyof typeof QUESTION_TYPES;
    return QUESTION_TYPES[first].order < QUESTION_TYPES[second].order ? -1 : 1;
  })
  .map((key) => QUESTION_TYPES[key as keyof typeof QUESTION_TYPES]);

export interface FreeInputQuestion extends QuestionBase {
  type: typeof QUESTION_TYPES.FreeResponseQuestion.value;
}

export interface IndeterminateQuestion extends QuestionBase {
  type: ''
}

// TODO: For now, we only support free text fields, but we'll eventually
// extend the app to work with multiple choice fields and other such
// niceties.
export type Question = IndeterminateQuestion | FreeInputQuestion;
