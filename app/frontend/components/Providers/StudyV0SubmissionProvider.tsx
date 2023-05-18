import React from "react";
import {
  useContextSelector,
  createContext,
  Context,
} from "use-context-selector";
import { SchemaV0 } from "@/core/types";

const StudyContext = createContext<SchemaV0 | null>(null);

const SetStudyContext = React.createContext<React.Dispatch<
  React.SetStateAction<SchemaV0>
> | null>(null);

type Selector<T> = (schema: SchemaV0) => T;

export const useStudy = <T,>(selector: Selector<T>): T => {
  return useContextSelector(StudyContext as Context<SchemaV0>, selector);
};

export const useSetStudy = () => {
  const ctx = React.useContext(SetStudyContext);
  if (ctx === null) {
    throw new Error("Please use useSetStudy inside its provider.");
  }
  return ctx;
};

interface StudyProviderProps {
  schema: SchemaV0;
  children: React.ReactNode;
}

export const StudyProvider = (props: StudyProviderProps) => {
  const { schema, children } = props;
  const [val, setVal] = React.useState(schema);
  return (
    <SetStudyContext.Provider value={setVal}>
      <StudyContext.Provider value={val}>{children}</StudyContext.Provider>
    </SetStudyContext.Provider>
  );
};
