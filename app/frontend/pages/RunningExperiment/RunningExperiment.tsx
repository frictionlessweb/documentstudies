import React from "react";
import { Loading } from "@/components/Loading";
import type { StudyAssignment } from "@/core/types";
import { Flex, Text } from "@adobe/react-spectrum";
import { produce } from "immer";
import { ApiError } from "@/components/ApiError";
import { NotFound } from "../NotFound";
import { getAssignmentById } from "@/utils/util";

interface AssignmentState {
  fetchAttempted: boolean;
  loading: boolean;
  apiError: string;
  assignment: StudyAssignment | null;
}

const useFetchAssignment = (): AssignmentState => {
  const [assignmentState, setAssignmentState] = React.useState<AssignmentState>(
    { fetchAttempted: false, loading: false, apiError: "", assignment: null }
  );
  React.useEffect(() => {
    const fetchRequestedAssignment = async () => {
      if (assignmentState.fetchAttempted) return;
      setAssignmentState((prev) => {
        return produce(prev, (draft) => {
          draft.fetchAttempted = true;
          draft.loading = true;
        });
      });
      const urlParams = new URLSearchParams(window.location.search);
      const assignmentId = urlParams.get("assignment_id");
      if (assignmentId === null) {
        setAssignmentState((prev) => {
          return produce(prev, (draft) => {
            draft.loading = false;
            draft.assignment = null;
          });
        });
        return;
      }
      try {
        const assignment = await getAssignmentById(assignmentId);
        setAssignmentState((prev) => {
          return produce(prev, (draft) => {
            draft.assignment = assignment;
            draft.loading = false;
          });
        });
      } catch (err) {
        setAssignmentState((prev) => {
          return produce(prev, (draft) => {
            draft.assignment = null;
            draft.loading = false;
          });
        });
      }
    };
    fetchRequestedAssignment();
  }, [assignmentState]);
  return assignmentState;
};

export const RunningExperiment = () => {
  const assignment = useFetchAssignment();
  if (assignment.loading) {
    return (
      <Flex marginTop="16px">
        <Loading />
      </Flex>
    );
  }
  if (assignment.apiError) {
    return (
      <Flex marginTop="16px">
        <ApiError />
      </Flex>
    );
  }
  if (assignment.assignment === null) {
    return <NotFound />;
  }
  return (
    <Flex direction="column" marginTop="16px" width="100%" alignItems="center">
      <Flex maxWidth="600px">
        <Text>{JSON.stringify(assignment.assignment)}</Text>
      </Flex>
    </Flex>
  );
};
