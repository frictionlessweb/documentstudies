import React from "react";
import {
  Flex,
  RadioGroup as AdobeRadioGroup,
  Radio,
} from "@adobe/react-spectrum";
import { produce } from "immer";
import { TaskTypeV0RadioGroup } from "@/core/types";
import { useSetStudy } from "@/components/Providers/StudyV0SubmissionProvider";

interface RadioGroupProps {
  taskType: TaskTypeV0RadioGroup;
  taskIndex: number;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { taskType, taskIndex } = props;
  const setStudy = useSetStudy();
  return (
    <Flex direction="column" marginBottom="16px">
      <div dangerouslySetInnerHTML={{ __html: taskType.instructions }} />
      <AdobeRadioGroup
        onChange={(val) => {
          return setStudy((ctx) => {
            return produce(ctx, (study) => {
              const { pages } = study.content[study.group]!;
              const currentPage = pages[study.page_index]!;
              const currentTask = currentPage.tasks[taskIndex]!;
              const currentType = currentTask.type as TaskTypeV0RadioGroup;
              currentType.user_response = val;
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
