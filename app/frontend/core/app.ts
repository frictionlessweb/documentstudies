import { DocumentStudyDocument, Question } from "@/core/types";
import { produce } from "immer";

export interface AppState {
  documents: {
    fetchAttempted: boolean;
    apiError: string | null;
    areLoading: boolean;
    list: DocumentStudyDocument[];
  };
  questions: {
    fetchAttempted: boolean;
    apiError: string | null;
    areLoading: boolean;
    list: Question[];
  };
}

export const INITIAL_APP_STATE: AppState = {
  documents: {
    fetchAttempted: false,
    apiError: null,
    areLoading: false,
    list: [],
  },
  questions: {
    fetchAttempted: false,
    apiError: null,
    areLoading: false,
    list: [],
  },
};

export type AppAction =
  | { type: "INITIATE_DOCUMENT_FETCH" }
  | { type: "INITIATE_QUESTION_FETCH" }
  | { type: "QUESTION_FETCH_SUCCESS"; payload: Question[] }
  | { type: "QUESTION_FETCH_FAILURE"; payload: string }
  | { type: "DOCUMENT_FETCH_SUCCESS"; payload: DocumentStudyDocument[] }
  | { type: "DOCUMENT_FETCH_FAILURE"; payload: string }
  | { type: "INITIATE_DOCUMENT_UPLOAD" }
  | { type: 'INITIATE_QUESTION_UPDATE'  }
  | { type: "DOCUMENT_UPLOAD_ENDED"; payload: DocumentStudyDocument | null }
  | { type: "QUESTION_CREATION_ENDED"; payload: Question | null };

export const reduce = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "INITIATE_DOCUMENT_FETCH": {
      return produce(state, (draft) => {
        draft.documents.fetchAttempted = true;
        draft.documents.areLoading = true;
      });
    }
    case "DOCUMENT_FETCH_SUCCESS": {
      return produce(state, (draft) => {
        draft.documents.areLoading = false;
        draft.documents.list = action.payload;
      });
    }
    case "DOCUMENT_FETCH_FAILURE": {
      return produce(state, (draft) => {
        draft.documents.areLoading = false;
        draft.documents.apiError = action.payload;
      });
    }
    case "INITIATE_DOCUMENT_UPLOAD": {
      return produce(state, (draft) => {
        draft.documents.areLoading = true;
      });
    }
    case "DOCUMENT_UPLOAD_ENDED": {
      return produce(state, (draft) => {
        draft.documents.areLoading = false;
        if (action.payload === null) return;
        draft.documents.list.unshift(action.payload);
      });
    }
    case "INITIATE_QUESTION_FETCH": {
      return produce(state, (draft) => {
        draft.questions.fetchAttempted = true;
        draft.questions.areLoading = true;
      });
    }
    case "QUESTION_FETCH_SUCCESS": {
      return produce(state, (draft) => {
        draft.questions.areLoading = false;
        draft.questions.list = action.payload;
      });
    }
    case "QUESTION_FETCH_FAILURE": {
      return produce(state, (draft) => {
        draft.questions.areLoading = false;
        draft.questions.apiError = action.payload;
      });
    }
    case "QUESTION_CREATION_ENDED": {
      return produce(state, (draft) => {
        draft.questions.areLoading = false;
        if (action.payload === null) return;
        draft.questions.list.unshift(action.payload);
      });
    }
    case 'INITIATE_QUESTION_UPDATE': {
      return produce(state, (draft) => {
        draft.questions.areLoading = true;
      });
    }
  }
};
