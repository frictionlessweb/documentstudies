import React from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { DocumentStudyDocument } from "@/utils/types";

// STATE MANATEMENT
interface AppState {
  documents: {
    fetchAttempted: boolean;
    apiError: string | null;
    areLoading: boolean;
    list: DocumentStudyDocument[];
  };
}

const INITIAL_APP_STATE: AppState = {
  documents: {
    fetchAttempted: false,
    apiError: null,
    areLoading: false,
    list: [],
  },
};

type AppAction = { type: "INITIATE_DOCUMENT_UPLOAD" };

export const reduce = (state: AppState, action: AppAction): AppState => {
  return state;
};

// REACT MANAGEMENT
export const DocumentStudyContext = createContext<AppState>(INITIAL_APP_STATE);

type Selector<T> = (appState: AppState) => T;

export const useAppState = function <T>(selector: Selector<T>): T {
  return useContextSelector(DocumentStudyContext, selector);
};

export const DispatchContext =
  React.createContext<React.Dispatch<AppAction> | null>(null);

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateProvider = (props: StateProviderProps) => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reduce, INITIAL_APP_STATE);
  return (
    <DispatchContext.Provider value={dispatch}>
      <DocumentStudyContext.Provider value={state}>
        {children}
      </DocumentStudyContext.Provider>
    </DispatchContext.Provider>
  );
};
