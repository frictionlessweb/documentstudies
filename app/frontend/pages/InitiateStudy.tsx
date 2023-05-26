import React from "react";
import { getStudyById, createAssignmentFromStudy } from "@/utils/util";
import { Study } from "@/core/types";
import { ApiError } from "@/components/ApiError";
import { Loading } from "@/components/Loading";
import { NotFound } from "./NotFound";
import { Button, Flex, Heading, ProgressCircle, View } from "@adobe/react-spectrum";
import { useLocation } from "wouter";
import { ToastQueue } from "@react-spectrum/toast";

type FetchingStudyState =
  | { isLoading: false; fetchAttempted: false; study: null; apiError: null }
  | {
      isLoading: true;
      fetchAttempted: true;
      study: null;
      apiError: null;
    }
  | {
      isLoading: false;
      fetchAttempted: true;
      study: Study;
      apiError: null;
    }
  | {
      isLoading: false;
      fetchAttempted: true;
      study: null;
      apiError: string;
    };

export const useFetchStudy = (studyId: string | null): FetchingStudyState => {
  const [fetchState, setFetchState] = React.useState<FetchingStudyState>({
    isLoading: false,
    fetchAttempted: false,
    study: null,
    apiError: null,
  });
  React.useEffect(() => {
    const fetchStudy = async () => {
      if (studyId === null) return;
      setFetchState({
        isLoading: true,
        fetchAttempted: true,
        study: null,
        apiError: null,
      });
      try {
        const study = await getStudyById(studyId);
        setFetchState({
          isLoading: false,
          fetchAttempted: true,
          study: study,
          apiError: null,
        });
      } catch (err) {
        setFetchState({
          isLoading: false,
          fetchAttempted: true,
          study: null,
          apiError: "FETCH_FAILED",
        });
      }
    };
    fetchStudy();
  }, [studyId]);
  return fetchState;
};

interface CreateStudyAssignmentProps {
  study: Study;
}

const CreateStudyAssignment = (props: CreateStudyAssignmentProps) => {
  const { study } = props;
  const [_, setLocation] = useLocation();
  const [loading, setLoading] = React.useState(false);
  const beginStudy = React.useCallback(async () => {
    try {
      setLoading(true);
      const { id } = await createAssignmentFromStudy(study);
      setLocation(`/assignments?assignment_id=${id}`);
    } catch (err) {
      console.error(err);
      ToastQueue.negative(
        "Something went wrong. Please refresh the page and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [study, setLocation]);
  return (
    <Flex direction="column" gap="size-300" alignItems="center" marginY="size-300" marginX="size-100">
      
      <View>
        {study.schema.start_instructions ? (
          <div
            style={{ maxWidth: "600px" }}
            dangerouslySetInnerHTML={{ __html: study.schema.start_instructions }}
          />
        ) : (
          <Heading level={3}>Welcome to {study.schema.metadata.name}</Heading>
        )}
      </View>
      
      <Button isDisabled={loading} onPress={beginStudy} variant="accent">
        {loading ? (
          <ProgressCircle variant="overBackground" isIndeterminate />
        ) : (
          "Begin"
        )}
      </Button>
    </Flex>
  );
};

export const InitiateStudy = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const studyId = urlSearchParams.get("study_id");
  const fetchState = useFetchStudy(studyId);
  const { fetchAttempted, apiError, isLoading, study } = fetchState;
  if (studyId === null) return <NotFound />;
  if (apiError) return <ApiError />;
  if (isLoading || !fetchAttempted) return <Loading />;
  return <CreateStudyAssignment study={study as Study} />;
};
