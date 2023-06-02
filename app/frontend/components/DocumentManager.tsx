import React from "react";
import { MultiSelect } from "@/components/MultiSelect";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { UploadButton } from "@/components/UploadButton";
import { Text, Flex, Button } from "@adobe/react-spectrum";
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
  const uploadFiles = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event?.target?.files;
      if (files === null) return;
      try {
        dispatch({ type: "INITIATE_DOCUMENT_UPLOAD" });
        for (const file of files) {
          const res = await createNewDocument(file);
          dispatch({ type: "DOCUMENT_UPLOAD_ENDED", payload: res });
        }
        ToastQueue.positive("Studies created successfully.");
      } catch (err) {
        ToastQueue.negative(
          // @ts-expect-error - We know it should have this key.
          err?.message ||
            "An unexpected error occurred. Please refresh the page and try again."
        );
        dispatch({ type: "STUDY_CREATION_ENDED", payload: null });
      }
    },
    [dispatch]
  );
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const triggerChange = () => {
    if (inputRef.current === null) return;
    inputRef.current.click();
  };
  if (apiError !== null) return <ApiError />;
  if (areLoading && documents.length === 0) return <Loading />;
  return (
    <Flex direction="column">
      {documents.length > 0 ? (
        <MultiSelect items={documents} label="Documents" selectedIds={[]} />
      ) : (
        <Text>No documents found.</Text>
      )}
      <Flex marginY="16px">
        <Flex>
          <Button
            isDisabled={areLoading}
            onPress={triggerChange}
            variant="accent"
            aria-label="Upload a study"
          >
            Upload
          </Button>
        </Flex>
        <input
          ref={inputRef}
          onChange={uploadFiles}
          style={{ display: "none" }}
          type="file"
          multiple
          accept="application/pdf"
        />
      </Flex>
    </Flex>
  );
};
