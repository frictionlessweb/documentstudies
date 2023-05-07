import { createContext } from "use-context-selector";
import { DocumentStudyDocument } from "@/utils/types";

// STATE MANATEMENT
interface AppState {
  documents: {
    areLoading: boolean;
    list: DocumentStudyDocument[];
  };
}

type AppAction = { type: "INITIATE_DOCUMENT_UPLOAD" };

export const reduce = (state: AppState, action: AppAction): AppState => {
  return state;
};

const DocumentStudyContext = createContext<AppState | null>(null);
