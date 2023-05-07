import { DocumentStudyDocument } from "@/core/types";
import { produce } from 'immer';

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

export let reduce = (state: AppState, action: AppAction): AppState => {
  return state;
};
