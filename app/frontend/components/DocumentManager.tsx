import React from "react";
import {
  Button,
  Cell,
  Column,
  Row,
  TableView,
  TableBody,
  TableHeader,
  ActionButton,
  Text,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Header,
  Heading,
  Flex
} from "@adobe/react-spectrum";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { ApiError } from "@/components/ApiError";
import { Loading } from "@/components/Loading";
import { fetchAllDocuments, createNewDocument, deleteDocument } from "@/utils/util";
import { ToastQueue } from "@react-spectrum/toast";
import DeleteOutline from "@spectrum-icons/workflow/DeleteOutline";


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
      <TableView aria-label="Documents Table" selectionMode="multiple" width="100%">
        <TableHeader>
          <Column>Documents</Column>
          <Column align="end">Delete</Column>
        </TableHeader>
        <TableBody>
          {documents.length > 0 ? (
            documents.map((document) => (
              <Row key={document.id}>
                <Cell>{document.name}</Cell>
                <Cell>
                  <DialogTrigger>
                    <ActionButton isQuiet aria-label="Delete">
                      <DeleteOutline />
                    </ActionButton>
                    {(closeDialog) => (
                      <Dialog>
                        <Heading>Delete Study</Heading>
                        <Divider />
                        <Content>
                          <Text>Are you sure you want to delete this study?</Text>
                        </Content>
                        <ButtonGroup>
                          <Button variant="secondary" onPress={closeDialog}>
                            Cancel
                          </Button>
                          <Button
                            variant="negative"
                            onPress={async () => {
                              try {
                                await deleteDocument(document.id);
                                dispatch({type: "DOCUMENT_DELETION_COMPLETED", payload: document.id})
                                ToastQueue.positive("Document deleted successfully");
                              } catch (err) {
                                dispatch({
                                  type: "DOCUMENT_DELETION_COMPLETED",
                                  payload: null,
                                });
                                ToastQueue.negative(
                                  "Failed to delete the document, please refresh the page and try again"
                                );
                              } finally {
                                closeDialog();
                              }
                            }}
                          >
                            Confirm
                          </Button>
                        </ButtonGroup>
                      </Dialog>
                    )}
                  </DialogTrigger>
                </Cell>
              </Row>
            ))
          ) : (
            <Row>
              <Cell>
                <Text>No documents found.</Text>
              </Cell>
              <Cell> </Cell>
            </Row>
          )}
        </TableBody>
      </TableView>
          
      <Flex marginY="16px">
        <Flex>
          <Button
            isDisabled={areLoading}
            onPress={triggerChange}
            variant="accent"
            aria-label="Upload a Document"
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
