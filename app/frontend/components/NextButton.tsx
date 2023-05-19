import React from "react";
import { Flex, Button } from "@adobe/react-spectrum";
import { useSetStudy, useStudy } from "@/components/Providers/StudyV0SubmissionProvider";
import { produce } from "immer";
import { TaskV0 } from "@/core/types";

const isUnfinished = (task: TaskV0): boolean => {
  switch (task.type.tag) {
    case "text_entry": {
      return false;
    }
    case "radio_group": {
      return false;
    }
    case "collection": {
      return false;
    }
    case "highlights": {
      return false;
    }
  }
};

export const NextButton = () => {
  const isDisabled = useStudy((study): boolean => {
    const { pages } = study.content[study.group]!;
    const currentPage = pages[study.page_index]!;
    return currentPage.tasks.some(isUnfinished);
  });
  const setStudy = useSetStudy();
  const next = React.useCallback(() => {
    setStudy((prev) => {
      return produce(prev, (study) => {
        study.page_index += 1;
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
