import { DocumentStudyDocument } from "@/core/types";
import { produce } from "immer";

export interface AppState {
  documents: {
    fetchAttempted: boolean;
    apiError: string | null;
    areLoading: boolean;
    list: DocumentStudyDocument[];
  };
}

export const INITIAL_APP_STATE: AppState = {
  documents: {
    fetchAttempted: false,
    apiError: null,
    areLoading: false,
    list: [],
  },
};

export type AppAction =
  | { type: "INITIATE_DOCUMENT_FETCH" }
  | { type: "DOCUMENT_FETCH_SUCCESS"; payload: DocumentStudyDocument[] }
  | { type: "DOCUMENT_FETCH_FAILURE"; payload: string };

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
  }
};
