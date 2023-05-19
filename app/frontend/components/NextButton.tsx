import React from "react";
import { Flex, Button } from "@adobe/react-spectrum";
import { useSetStudy, useStudy } from "./Providers/StudyV0SubmissionProvider";
import { produce } from "immer";

export const NextButton = () => {
  const isDisabled = useStudy((study): boolean => {
    const { pages } = study.content[study.group]!;
    const currentPage = pages[study.page_index]!;
    const currentTask = currentPage.tasks[currentPage.task_index]!;
    switch (currentTask.type.tag) {
      case "text_entry": {
        if (!currentTask.type.required) return false;
        return currentTask.type.user_response === "";
      }
      case "radio_group": {
        return true;
      }
      case "collection": {
        return true;
      }
      case "highlights": {
        return true;
      }
    }
  });
  const setStudy = useSetStudy();
  const next = React.useCallback(() => {
    setStudy((prev) => {
      return produce(prev, (study) => {
        const { pages } = study.content[study.group]!;
        const currentPage = pages[study.page_index]!;
        const { tasks, task_index } = currentPage;
        if (task_index + 1 < tasks.length) {
          currentPage.task_index += 1;
        } else {
          study.page_index += 1;
        }
      });
    });
  }, [setStudy]);
  useSetStudy;
  return (
    <Flex>
      <Button onPress={next} isDisabled={isDisabled} variant="accent">
        Next
      </Button>
    </Flex>
  );
};
