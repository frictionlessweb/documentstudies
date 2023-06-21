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
    case "ranking": {
      // Ranking tasks are always finished.
      return false;
    }
  }
};

export const NextButton = () => {
  const [isSubmitting, setSubmitting] = React.useState(false);
  const study = useStudy((study) => study);
  const isDisabled =
    useStudy((study): boolean => {
      const { pages } = study.content[study.group]!;
      const currentPage = pages[study.page_index]!;
      return currentPage.tasks.some(isUnfinished);
    }) || isSubmitting;
  const setStudy = useSetStudy();
  const next = React.useCallback(async () => {
    const newStudy = { ...study, page_index: study.page_index + 1 };
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get("assignment_id");
    if (assignmentId === null) return;
    const studyIsFinished =
      newStudy.page_index >= study.content![study.group]!.pages.length;
    try {
      setSubmitting(true);
      await updateAssignment(assignmentId, newStudy, studyIsFinished);
      if (studyIsFinished) {
        ToastQueue.positive("Progress saved successfully.");
      }
    } catch (err) {
      ToastQueue.negative("An error occurred when saving the study.");
    } finally {
      setSubmitting(false);
    }
    setStudy((prev) => {
      const newStudy = produce(prev, (study) => {
        study.page_index += 1;
      });
      return newStudy;
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [setStudy, study]);
  return (
    <Flex>
      <Button onPress={next} isDisabled={isDisabled} variant="accent">
        Next
      </Button>
    </Flex>
  );
};
