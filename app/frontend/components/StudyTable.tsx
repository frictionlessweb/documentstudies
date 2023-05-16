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
import { fetchAllStudies, downloadJson } from "@/utils/util";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { ApiError } from "@/components/ApiError";
import { Loading } from "@/components/Loading";

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
        <Column>Schema</Column>
      </TableHeader>
      <TableBody>
        {list.map((listItem) => {
          return (
            <Row key={listItem.id}>
              <Cell>
                {listItem?.schema?.metadata?.name || "No name found."}
              </Cell>
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
