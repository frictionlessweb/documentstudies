import React from "react";
import { Flex, TextArea } from "@adobe/react-spectrum";
import { TaskV0TextResponse } from "@/core/types";
import {
  useStudy,
  useSetStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";
import { produce } from "immer";

interface TextEntryProps {
  taskType: TaskV0TextResponse;
  taskIndex: number;
}

export const TextEntry = (props: TextEntryProps) => {
  const { taskType, taskIndex } = props;
  const setStudy = useSetStudy();
  const value = useStudy((study) => {
    const { pages } = study.content[study.group]!;
    const currentPage = pages[study.page_index]!;
    const currentTask = currentPage.tasks[taskIndex]!;
    const currentType = currentTask;
    if (currentType.tag === "text_entry") {
      return currentType.user_response;
    } else if (currentType.tag === "collection") {
      const theTask = currentType.tasks[
        currentType.task_collection_index
      ]! as TaskV0TextResponse;
      return theTask.user_response;
    }
  });
  return (
    <Flex direction="column" >
      <div dangerouslySetInnerHTML={{ __html: taskType.instructions }} />
      <TextArea width="95%" alignSelf="center"
        onChange={(s) => {
          return setStudy((prev) => {
            return produce(prev, (study) => {
              const { pages } = study.content[study.group]!;
              const currentPage = pages[study.page_index]!;
              const currentTask = currentPage.tasks[taskIndex]!;
              const currentType = currentTask;

              if (currentType.tag === "text_entry") {
                currentType.user_response = s;
              } else if (currentType.tag === "collection") {
                const theTask = currentType.tasks[
                  currentType.task_collection_index
                ]! as TaskV0TextResponse;
                theTask.user_response = s;
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
