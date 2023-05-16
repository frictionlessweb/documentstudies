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
  fetchAllStudies,
  downloadJson,
} from "@/utils/util";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { ApiError } from "@/components/ApiError";
import { Loading } from "@/components/Loading";

const useCreateStudy = () => {
  const dispatch = useDispatch();
  const createStudy = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event?.target?.files;
      if (files === null) return;
      const file = files.item(0);
      if (file === null) return;
      const text = await file.text();
      const theJson = JSON.parse(text);
      try {
        dispatch({ type: "INITIATE_STUDY_CREATION" });
        const res = await createNewStudy({ schema: theJson });
        dispatch({ type: "STUDY_CREATION_ENDED", payload: res });
      } catch (err) {
        dispatch({ type: "STUDY_CREATION_ENDED", payload: null });
      }
    },
    [dispatch]
  );
  return createStudy;
};

const CreateStudyButton = () => {
  const createStudy = useCreateStudy();
  const isDisabled = useAppState((state) => state.studies.areLoading);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const triggerChange = () => {
    if (inputRef.current === null) return;
    inputRef.current.click();
  };
  return (
    <Flex direction="column">
      <Flex>
        <Button
          isDisabled={isDisabled}
          onPress={triggerChange}
          variant="accent"
        >
          Create Study
        </Button>
      </Flex>
      <input
        ref={inputRef}
        onChange={createStudy}
        style={{ display: "none" }}
        type="file"
        accept="application/json"
      />
    </Flex>
  );
};

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

export const StudyAssignmentTable = () => {
  const { apiError, areLoading, list } = useAppState((state) => state.studies);
  useFetchStudies();
  if (apiError) return <ApiError />;
  if (areLoading) return <Loading />;
  return (
    <TableView
      aria-label="Example table with static contents"
      selectionMode="multiple"
      width="size-6000"
    >
      <TableHeader>
        <Column>Name</Column>
        <Column>Study Id</Column>
        <Column>Group</Column>
        <Column>Link</Column>
        <Column>Results</Column>
      </TableHeader>
      <TableBody>
        <Row>
          <Cell>A</Cell>
          <Cell>b</Cell>
          <Cell>c</Cell>
          <Cell>d</Cell>
          <Cell>e</Cell>
        </Row>
      </TableBody>
    </TableView>
  );
};
