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
} from "@adobe/react-spectrum";
import DeleteOutline from "@spectrum-icons/workflow/DeleteOutline";
import Download from "@spectrum-icons/workflow/Download";
import {
  deleteStudy,
  downloadJson,
  fetchAllStudies,
  fetchCompletedAssignments,
} from "@/utils/util";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { ApiError } from "@/components/ApiError";
import { Loading } from "@/components/Loading";
import { ToastQueue } from "@react-spectrum/toast";

const useFetchStudies = () => {
  const { fetchAttempted } = useAppState((state) => state.studies);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchTheStudies = async () => {
      if (fetchAttempted) return;
      dispatch({ type: "INITIATE_STUDY_FETCH" });
      try {
        const studies = await fetchAllStudies();
        dispatch({ type: "STUDY_FETCH_SUCCESS", payload: studies });
      } catch (err) {
        dispatch({ type: "STUDY_FETCH_FAILURE", payload: "FETCH FAILED" });
      }
    };
    fetchTheStudies();
  }, [fetchAttempted, dispatch]);
};

export const StudyTable = () => {
  const { apiError, areLoading, list } = useAppState((state) => state.studies);
  useFetchStudies();
  const dispatch = useDispatch();
  if (apiError) return <ApiError />;
  if (areLoading) return <Loading />;
  return (
    <TableView
      aria-label="Example table with static contents"
      selectionMode="multiple"
      width="100%"
    >
      <TableHeader>
        <Column>Study</Column>
        <Column align="center">Download Results</Column>
        <Column align="center">Delete</Column>
      </TableHeader>
      <TableBody>
        {list.map((listItem) => {
          return (
            <Row key={listItem.id}>
              <Cell>
                <a href={`/studies/?study_id=${listItem.id}`}>
                  {listItem?.schema?.metadata?.name || "No name found."}
                </a>
              </Cell>
              <Cell>
                <ActionButton
                  isQuiet
                  aria-label="Download"
                  onPress={async () => {
                    try {
                      const assignments = await fetchCompletedAssignments(
                        listItem.id
                      );
                      downloadJson(
                        assignments,
                        listItem?.schema?.metadata?.name || "No name found."
                      );
                    } catch (err) {
                      ToastQueue.negative(
                        "Something went wrong. Please refresh the page and try again."
                      );
                    }
                  }}
                >
                  <Download color="informative" />
                </ActionButton>
              </Cell>
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
                              dispatch({ type: "INITIATE_STUDY_API" });
                              await deleteStudy(listItem.id);
                              dispatch({
                                type: "STUDY_DELETION_ENDED",
                                payload: listItem.id,
                              });
                              ToastQueue.positive("Study deleted successfully");
                            } catch (err) {
                              dispatch({
                                type: "STUDY_DELETION_ENDED",
                                payload: null,
                              });
                              ToastQueue.negative(
                                "Failed to delete study. Please refresh the page and try again."
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
          );
        })}
      </TableBody>
    </TableView>
  );
};
