import React from "react";
import {
  Flex,
  Heading,
  Button,
  Cell,
  Column,
  Row,
  TableView,
  TableBody,
  TableHeader,
} from "@adobe/react-spectrum";
import { DocumentManager } from "@/components/DocumentManager";
import {
  createStudy as createNewStudy,
  fetchAllStudies,
  downloadJson,
} from "@/utils/util";
import { useLocation } from "wouter";
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
  const { fetchAttempted, apiError, areLoading, list } = useAppState(
    (state) => state.studies
  );
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

const StudyTable = () => {
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
        <Column>ID</Column>
        <Column>Schema</Column>
      </TableHeader>
      <TableBody>
        {list.map((listItem) => {
          return (
            <Row key={listItem.id}>
              <Cell>{listItem.id}</Cell>
              <Cell>
                <Button
                  onPress={() => {
                    downloadJson(listItem.schema);
                  }}
                  variant="primary"
                >
                  Download Schema
                </Button>
              </Cell>
            </Row>
          );
        })}
      </TableBody>
    </TableView>
  );
};

export const StudiesOverview = () => {
  const [_, setLocation] = useLocation();
  return (
    <Flex>
      <Flex direction="column" marginEnd="16px">
        <Heading marginTop={0} level={2}>
          Manage Documents
        </Heading>
        <DocumentManager />
      </Flex>
      <Flex direction="column">
        <Heading marginTop={0} level={2}>
          Manage Studies
        </Heading>
        <Flex marginBottom="16px" direction="column">
          <StudyTable />
        </Flex>
        <CreateStudyButton />
      </Flex>
    </Flex>
  );
};
