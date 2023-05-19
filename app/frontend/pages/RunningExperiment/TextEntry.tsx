import React from "react";
import { Flex, TextArea } from "@adobe/react-spectrum";
import { TaskTypeV0TextResponse } from "@/core/types";
import {
  useSetStudy,
  useStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";
import { produce } from "immer";
import { NextButton } from "@/components/NextButton";

interface TextEntryProps {
  taskType: TaskTypeV0TextResponse;
  taskIndex: number;
}

export const TextEntry = (props: TextEntryProps) => {
  const group = useStudy((study) => study.group);
  const setStudy = useSetStudy();
  const { taskType, taskIndex } = props;
  return (
    <Flex direction="column">
      <div dangerouslySetInnerHTML={{ __html: taskType.instructions }} />
      <TextArea
        onChange={(s) => {
          return setStudy((prev) => {
            return produce(prev, (study) => {
              const { pages } = study.content[study.group]!;
              const currentPage = pages[study.page_index]!;
              const currentTask = currentPage.tasks[taskIndex]!;
              const currentType = currentTask.type as TaskTypeV0TextResponse;
              currentType.user_response = s;
            });
          });
        }}
        value={taskType.user_response}
        marginBottom="16px"
      />
    </Flex>
  );
};
