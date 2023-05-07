import React from "react";
import { MultiSelect } from "@/components/MultiSelect";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { fetchAllDocuments } from "@/utils/util";

const useFetchDocuments = () => {
  const { list, areLoading, fetchAttempted, apiError } = useAppState(
    (state) => {
      return state.documents;
    }
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchDocuments = async () => {
      if (fetchAttempted) return;
      dispatch({ type: "INITIATE_DOCUMENT_FETCH" });
      try {
        const docs = await fetchAllDocuments();
        dispatch({ type: "DOCUMENT_FETCH_SUCCESS", payload: docs });
      } catch (err) {
        dispatch({
          type: "DOCUMENT_FETCH_FAILURE",
          payload: "Api call failed.",
        });
      }
    };
    fetchDocuments();
  }, [dispatch, fetchAttempted]);
  return { list, areLoading, apiError };
};

export const DocumentManager = () => {
  const { list: documents, areLoading, apiError } = useFetchDocuments();
  console.log(documents);
  return (
    <MultiSelect
      items={[]}
      label="Documents"
      onSelectionChange={() => {}}
      selectedIds={[]}
    />
  );
};
