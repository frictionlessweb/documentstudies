import React from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { reduce, INITIAL_APP_STATE, AppState, AppAction } from "@/core/app";

export const DocumentStudyContext = createContext<AppState>(INITIAL_APP_STATE);

type Selector<T> = (appState: AppState) => T;

export const useAppState = function <T>(selector: Selector<T>): T {
  return useContextSelector(DocumentStudyContext, selector);
};

export const DispatchContext =
  React.createContext<React.Dispatch<AppAction> | null>(null);

export const useDispatch = () => {
  const ctx = React.useContext(DispatchContext);
  if (ctx === null) {
    throw new Error('Please use useDispatch inside its provider.');
  }
  return ctx;
}

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
