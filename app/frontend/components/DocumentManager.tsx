import React from "react";
import { MultiSelect } from "@/components/MultiSelect";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { UploadButton } from "@/components/UploadButton";
import { Text, Flex } from "@adobe/react-spectrum";
import { ApiError } from "@/components/ApiError";
import { Loading } from "@/components/Loading";
import { fetchAllDocuments, createNewDocument } from "@/utils/util";
import { ToastQueue } from "@react-spectrum/toast";

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
  const dispatch = useDispatch();
  const handleFileUpload = React.useCallback(
    async (file: File) => {
      dispatch({ type: "INITIATE_DOCUMENT_UPLOAD" });
      try {
        const doc = await createNewDocument(file);
        dispatch({ type: "DOCUMENT_UPLOAD_ENDED", payload: doc });
      } catch (err) {
        ToastQueue.negative(
          "An error occurred after uploading the document. Please refresh the page and try again."
        );
        dispatch({ type: "DOCUMENT_UPLOAD_ENDED", payload: null });
      }
    },
    [dispatch]
  );
  if (apiError !== null) return <ApiError />;
  if (areLoading) return <Loading />;
  return (
    <Flex direction="column">
      {documents.length > 0 ? (
        <MultiSelect items={documents} label="Documents" selectedIds={[]} />
      ) : (
        <Text>No documents found.</Text>
      )}
      <Flex marginY="16px">
        <UploadButton
          accept="application/pdf"
          onFileUpload={handleFileUpload}
          variant="accent"
          aria-label="Upload a PDF"
        >
          Upload
        </UploadButton>
      </Flex>
    </Flex>
  );
};
