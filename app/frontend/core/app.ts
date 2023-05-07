import { DocumentStudyDocument } from "@/core/types";

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

export type AppAction = { type: "INITIATE_DOCUMENT_UPLOAD" };

export const reduce = (state: AppState, action: AppAction): AppState => {
  return state;
};
