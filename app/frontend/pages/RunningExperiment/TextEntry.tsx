import React from "react";
import { Flex, TextArea } from "@adobe/react-spectrum";
import { TaskTypeV0TextResponse } from "@/core/types";
import {
  useStudy,
  useSetStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";
import { produce } from "immer";

interface TextEntryProps {
  taskType: TaskTypeV0TextResponse;
  taskIndex: number;
}

export const TextEntry = (props: TextEntryProps) => {
  const { taskType, taskIndex } = props;
  const setStudy = useSetStudy();
  const value = useStudy((study) => {
    const { pages } = study.content[study.group]!;
    const currentPage = pages[study.page_index]!;
    const currentTask = currentPage.tasks[taskIndex]!;
    const currentType = currentTask.type;
    if (currentType.tag === "text_entry") {
      return currentType.user_response;
    } else if (currentType.tag === "collection") {
      const theTask = currentType.tasks[currentType.task_collection_index]!;
      const theTaskType = theTask.type as TaskTypeV0TextResponse;
      return theTaskType.user_response;
    }
  });
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
              const currentType = currentTask.type;

              if (currentType.tag === "text_entry") {
                currentType.user_response = s;
              } else if (currentType.tag === "collection") {
                const theTask =
                  currentType.tasks[currentType.task_collection_index]!;
                const theTaskType = theTask.type as TaskTypeV0TextResponse;
                theTaskType.user_response = s;
              }
            });
          });
        }}
        value={value}
        marginBottom="16px"
      />
    </Flex>
  );
};
