import React from "react";
import {
  Button,
  Cell,
  Column,
  Row,
  TableView,
  TableBody,
  TableHeader,
} from "@adobe/react-spectrum";
import { deleteStudy, downloadJson, fetchAllStudies, fetchCompletedAssignments } from "@/utils/util";
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
        <Column>Link</Column>
        <Column>Results</Column>
        <Column>Delete</Column>
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
                <Button
                  onPress={async () => {
                    try {
                      const assignments = await fetchCompletedAssignments(
                        listItem.id
                      );
                      downloadJson(assignments);
                    } catch (err) {
                      ToastQueue.negative(
                        "Something went wrong. Please refresh the page and try again."
                      );
                    }
                  }}
                  variant="accent"
                >
                  Download
                </Button>
              </Cell>
              <Cell>
                <Button
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
                      dispatch({ type: "STUDY_DELETION_ENDED", payload: null });
                      ToastQueue.negative(
                        "Failed to delete study. Please refresh the page and try again."
                      );
                    }
                  }}
                  variant="negative"
                >
                  Delete
                </Button>
              </Cell>
            </Row>
          );
        })}
      </TableBody>
    </TableView>
  );
};
