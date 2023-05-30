import React from "react";
import { Flex, Button } from "@adobe/react-spectrum";
import {
  useSetStudy,
  useStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";
import { produce } from "immer";

export const PreviousButton = () => {
  const study = useStudy((study) => study);
  const isDisabled = useStudy((study): boolean => {
    return study.page_index - 1 < 0;
  });
  const setStudy = useSetStudy();
  const previous = React.useCallback(async () => {
    setStudy((prev) => {
      const newStudy = produce(prev, (study) => {
        study.page_index -= 1;
      });
      return newStudy;
    });
    const newStudy = { ...study, page_index: study.page_index - 1 };
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get("assignment_id");
    if (assignmentId === null) return;
    window.localStorage.setItem(assignmentId, JSON.stringify(newStudy));
  }, [setStudy, study]);
  return (
    <Flex marginEnd="16px">
      <Button onPress={previous} isDisabled={isDisabled} variant="accent">
        Previous
      </Button>
    </Flex>
  );
};
