import React from "react";
import {
  Flex,
  Button,
  Cell,
  Column,
  Row,
  TableView,
  TableBody,
  TableHeader,
} from "@adobe/react-spectrum";
import {
  createStudy as createNewStudy,
  fetchAllStudyAssignments,
  downloadJson,
} from "@/utils/util";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { ApiError } from "@/components/ApiError";
import { Loading } from "@/components/Loading";

const useFetchStudyAssignments = () => {
  const { fetchAttempted } = useAppState((state) => state.studies);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchTheStudies = async () => {
      if (fetchAttempted) return;
      dispatch({ type: "INITIATE_STUDY_ASSIGNMENT_FETCH" });
      try {
        const studies = await fetchAllStudyAssignments();
        dispatch({ type: "STUDY_ASSIGNMENT_FETCH_SUCCESS", payload: studies });
      } catch (err) {
        dispatch({
          type: "STUDY_ASSIGNMENT_FETCH_FAILURE",
          payload: "FETCH FAILED",
        });
      }
    };
    fetchTheStudies();
  }, [fetchAttempted, dispatch]);
};

export const StudyAssignmentTable = () => {
  const { apiError, areLoading, list } = useAppState(
    (state) => state.studyAssignments
  );
  useFetchStudyAssignments();
  if (apiError) return <ApiError />;
  if (areLoading) return <Loading />;
  return (
    <TableView
      aria-label="Example table with static contents"
      selectionMode="multiple"
      width="size-6000"
    >
      <TableHeader>
        <Column>Study Name</Column>
        <Column>Group</Column>
        <Column>Link</Column>
        <Column>Results</Column>
      </TableHeader>
      <TableBody>
        {list.map((el) => {
          const theLink = `${window.location.host}/?assignment_id=${el.id}`;
          return (
            <Row key={el.id}>
              <Cell>{el?.results?.metadata?.name || "No Name"}</Cell>
              <Cell>{el.group}</Cell>
              <Cell>
                <a href={theLink}>{theLink}</a>
              </Cell>
              <Cell>
                <Button
                  onPress={() => {
                    downloadJson(el.results);
                  }}
                  variant="primary"
                >
                  Download
                </Button>
              </Cell>
            </Row>
          );
        })}
      </TableBody>
    </TableView>
  );
};
