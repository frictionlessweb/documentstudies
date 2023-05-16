import { DocumentStudyDocument, Study, StudyAssignment } from "@/core/types";
import { produce } from "immer";

export interface AppState {
  documents: {
    fetchAttempted: boolean;
    apiError: string | null;
    areLoading: boolean;
    list: DocumentStudyDocument[];
  };
  studies: {
    fetchAttempted: boolean;
    apiError: string | null;
    areLoading: boolean;
    list: Study[];
  };
  studyAssignments: {
    fetchAttempted: boolean;
    apiError: string | null;
    areLoading: boolean;
    list: StudyAssignment[];
  };
}

export const INITIAL_APP_STATE: AppState = {
  documents: {
    fetchAttempted: false,
    apiError: null,
    areLoading: false,
    list: [],
  },
  studies: {
    fetchAttempted: false,
    apiError: null,
    areLoading: false,
    list: [],
  },
  studyAssignments: {
    fetchAttempted: false,
    apiError: null,
    areLoading: false,
    list: [],
  },
};

export type AppAction =
  | { type: "INITIATE_DOCUMENT_FETCH" }
  | { type: "DOCUMENT_FETCH_SUCCESS"; payload: DocumentStudyDocument[] }
  | { type: "DOCUMENT_FETCH_FAILURE"; payload: string }
  | { type: "INITIATE_DOCUMENT_UPLOAD" }
  | { type: "DOCUMENT_UPLOAD_ENDED"; payload: DocumentStudyDocument | null }
  | { type: "INITIATE_STUDY_FETCH" }
  | { type: "STUDY_FETCH_SUCCESS"; payload: Study[] }
  | { type: "STUDY_FETCH_FAILURE"; payload: string }
  | { type: "INITIATE_STUDY_CREATION" }
  | { type: "STUDY_CREATION_ENDED"; payload: Study | null }
  | { type: "INITIATE_STUDY_ASSIGNMENT_FETCH" }
  | { type: "STUDY_ASSIGNMENT_FETCH_SUCCESS"; payload: StudyAssignment[] }
  | { type: "STUDY_ASSIGNMENT_FETCH_FAILURE"; payload: string }
  | { type: "INITIATE_STUDY_ASSIGNMENT_CREATION" }
  | {
      type: "STUDY_ASSIGNMENT_CREATION_ENDED";
      payload: StudyAssignment | null;
    };

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
    case "INITIATE_STUDY_FETCH": {
      return produce(state, (draft) => {
        draft.studies.fetchAttempted = true;
        draft.studies.areLoading = true;
      });
    }
    case "STUDY_FETCH_SUCCESS": {
      return produce(state, (draft) => {
        draft.studies.areLoading = false;
        draft.studies.list = action.payload;
      });
    }
    case "STUDY_FETCH_FAILURE": {
      return produce(state, (draft) => {
        draft.studies.areLoading = false;
        draft.studies.apiError = action.payload;
      });
    }
    case "INITIATE_STUDY_CREATION": {
      return produce(state, (draft) => {
        draft.studies.areLoading = true;
      });
    }
    case "STUDY_CREATION_ENDED": {
      return produce(state, (draft) => {
        draft.studies.areLoading = false;
        if (action.payload === null) return;
        draft.studies.list.unshift(action.payload);
      });
    }
    case "INITIATE_STUDY_ASSIGNMENT_FETCH": {
      return produce(state, (draft) => {
        draft.studyAssignments.fetchAttempted = true;
        draft.studyAssignments.areLoading = true;
      });
    }
    case "STUDY_ASSIGNMENT_FETCH_SUCCESS": {
      return produce(state, (draft) => {
        draft.studyAssignments.areLoading = false;
        draft.studyAssignments.list = action.payload;
      });
    }
    case "STUDY_ASSIGNMENT_FETCH_FAILURE": {
      return produce(state, (draft) => {
        draft.studyAssignments.areLoading = false;
        draft.studyAssignments.apiError = action.payload;
      });
    }
    case "INITIATE_STUDY_ASSIGNMENT_CREATION": {
      return produce(state, (draft) => {
        draft.studyAssignments.areLoading = true;
      });
    }
    case "STUDY_ASSIGNMENT_CREATION_ENDED": {
      return produce(state, (draft) => {
        draft.studyAssignments.areLoading = false;
        if (action.payload === null) return;
        draft.studyAssignments.list.unshift(action.payload);
      });
    }
  }
};
