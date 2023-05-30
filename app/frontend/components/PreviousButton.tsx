import React from "react";
import { Flex, Button } from "@adobe/react-spectrum";
import {
  useSetStudy,
  useStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";
import { produce } from "immer";

export const PreviousButton = () => {
  const study = useStudy((study) => study);
  const isDisabled = study.page_index - 1 < 0;
  const isHidden = Boolean(
    study.content[study.group]!.pages[study.page_index]?.hide_previous_button
  );
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
  if (isHidden) return null;
  return (
    <Flex marginEnd="16px">
      <Button onPress={previous} isDisabled={isDisabled} variant="secondary">
        Previous
      </Button>
    </Flex>
  );
};
