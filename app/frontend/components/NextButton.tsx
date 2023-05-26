import React from "react";
import { Flex, Button } from "@adobe/react-spectrum";
import {
  useSetStudy,
  useStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";
import { updateAssignment } from "@/utils/util";
import { produce } from "immer";
import { TaskV0 } from "@/core/types";
import { ToastQueue } from "@react-spectrum/toast";

const isUnfinished = (task: TaskV0): boolean => {
  switch (task.tag) {
    case "text_entry": {
      if (!task.required) return false;
      return task.user_response === "";
    }
    case "radio_group": {
      if (!task.required) return false;
      return task.user_response === "";
    }
    case "highlights": {
      const numResponses = task.user_response.length;
      const isBetween =
        numResponses >= task.min_number && numResponses <= task.max_number;
      return !isBetween;
    }
    case "checkbox_group": {
      const numResponses = task.user_response.length;
      const isBetween =
        numResponses >= task.min_selected && numResponses <= task.max_selected;
      return !isBetween;
    }
    case "collection": {
      return task.tasks.some((subtask) => isUnfinished(subtask));
    }
  }
};

export const NextButton = () => {
  const study = useStudy((study) => study);
  const isDisabled = useStudy((study): boolean => {
    const { pages } = study.content[study.group]!;
    const currentPage = pages[study.page_index]!;
    return currentPage.tasks.some(isUnfinished);
  });
  const setStudy = useSetStudy();
  const next = React.useCallback(async () => {
    setStudy((prev) => {
      const newStudy = produce(prev, (study) => {
        study.page_index += 1;
      });
      return newStudy;
    });
    const newStudy = { ...study, page_index: study.page_index + 1 };
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get("assignment_id");
    if (assignmentId === null) return;
    window.localStorage.setItem(assignmentId, JSON.stringify(newStudy));
    if (newStudy.page_index >= study.content![study.group]!.pages.length) {
      try {
        await updateAssignment(assignmentId, newStudy);
        ToastQueue.positive("Progress saved successfully.");
      } catch (err) {
        ToastQueue.negative("An error occurred when saving the study.");
      }
    }
  }, [setStudy, study]);
  return (
    <Flex>
      <Button onPress={next} isDisabled={isDisabled} variant="accent">
        Next
      </Button>
    </Flex>
  );
};
