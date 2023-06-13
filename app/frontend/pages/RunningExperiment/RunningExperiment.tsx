import React from "react";
import { Loading } from "@/components/Loading";
import type { SchemaV0, StudyAssignment } from "@/core/types";
import { Flex } from "@adobe/react-spectrum";
import { produce } from "immer";
import { ApiError } from "@/components/ApiError";
import { BadSchema } from "@/pages/BadSchema";
import { StudyProvider } from "@/components/Providers/StudyV0SubmissionProvider";
import { NotFound } from "@/pages/NotFound";
import { updateAssignment, getAssignmentById } from "@/utils/util";
import { V0Experiment } from "@/pages/RunningExperiment/V0Experiment";

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

const NewExperiment = () => {
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
  const {
    assignment: { results: schema },
  } = assignment;
  const isBadSchema = schema.schema_version !== "v0";
  if (isBadSchema) {
    return <BadSchema />;
  }
  return (
    <StudyProvider
      schema={{ ...schema, group: assignment.assignment.group } as SchemaV0}
    >
      <V0Experiment />
    </StudyProvider>
  );
};

interface OldExperimentProps {
  schema: SchemaV0;
}

const OldExperiment = (props: OldExperimentProps) => {
  const { schema } = props;
  React.useEffect(() => {
    const update = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const assignmentId = urlParams.get("assignment_id");
      try {
        await updateAssignment(assignmentId!, schema, false);
        localStorage.removeItem(assignmentId as string);
        console.log('ran successfully');
      } catch (err) {
        console.error(err);
      }
    };
    update();
  }, []);
  return (
    <StudyProvider schema={schema}>
      <V0Experiment />
    </StudyProvider>
  );
};

export const RunningExperiment = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const assignmentId = urlParams.get("assignment_id");
  if (assignmentId === null) return <NotFound />;
  const storedSchema = window.localStorage.getItem(assignmentId);
  if (storedSchema === null) return <NewExperiment />;
  const schema = JSON.parse(storedSchema);
  return <OldExperiment schema={schema} />;
};
