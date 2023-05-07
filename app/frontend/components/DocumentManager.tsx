import React from "react";
import { MultiSelect } from "@/components/MultiSelect";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { UploadButton } from "@/components/UploadButton";
import { Text, Flex, ProgressCircle } from "@adobe/react-spectrum";
import { fetchAllDocuments, createNewDocument } from "@/utils/util";

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

const Loading = () => {
  return (
    <Flex width="100%" justifyContent="center">
      <ProgressCircle isIndeterminate />
    </Flex>
  );
};

const ErrorMessage = () => {
  return (
    <Flex
      width="100%"
      UNSAFE_style={{
        backgroundColor: "#f8bbd0",
        padding: "8px",
        overflow: "wrap",
        borderRadius: "8px",
      }}
    >
      <Text maxWidth="200px">
        An error occurred. Please refresh the page and try again.
      </Text>
    </Flex>
  );
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
        /**
         * TODO: Create a nice toast with the error rather than just logging
         * it to the console.
         */
        console.error(err);
        dispatch({ type: "DOCUMENT_UPLOAD_ENDED", payload: null });
      }
    },
    [dispatch]
  );
  if (apiError !== null) return <ErrorMessage />;
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
        >
          Upload Document
        </UploadButton>
      </Flex>
    </Flex>
  );
};
