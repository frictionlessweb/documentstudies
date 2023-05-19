import React from "react";
import {
  Flex,
  RadioGroup as AdobeRadioGroup,
  Radio,
} from "@adobe/react-spectrum";
import { produce } from "immer";
import { TaskTypeV0RadioGroup } from "@/core/types";
import {
  useSetStudy,
  useStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";

interface RadioGroupProps {
  taskType: TaskTypeV0RadioGroup;
  taskIndex: number;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { taskType, taskIndex } = props;
  const currentValue = useStudy((study) => {
    const { pages } = study.content[study.group]!;
    const currentPage = pages[study.page_index]!;
    const currentTask = currentPage.tasks[taskIndex]!;
    console.log('current task ', currentTask);
    const currentType = currentTask.type;

    if (currentType.tag === "radio_group") {
      return currentType.user_response;
    } else if (currentType.tag === "collection") {
      const theTask = currentType.tasks[currentType.task_collection_index]!;
      const theTaskType = theTask.type as TaskTypeV0RadioGroup;
      return theTaskType.user_response;
    }
  });
  const setStudy = useSetStudy();
  return (
    <Flex direction="column" marginBottom="16px">
      <div dangerouslySetInnerHTML={{ __html: taskType.instructions }} />
      <AdobeRadioGroup
        value={currentValue}
        onChange={(val) => {
          return setStudy((ctx) => {
            return produce(ctx, (study) => {
              const { pages } = study.content[study.group]!;
              const currentPage = pages[study.page_index]!;
              const currentTask = currentPage.tasks[taskIndex]!;
              const currentType = currentTask.type;

              if (currentType.tag === "radio_group") {
                currentType.user_response = val;
              } else if (currentType.tag === "collection") {
                const theTask =
                  currentType.tasks[currentType.task_collection_index]!;
                const theTaskType = theTask.type as TaskTypeV0RadioGroup;
                theTaskType.user_response = val;
              }
            });
          });
        }}
      >
        {taskType.response_options.map((option) => {
          return (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          );
        })}
      </AdobeRadioGroup>
    </Flex>
  );
};
