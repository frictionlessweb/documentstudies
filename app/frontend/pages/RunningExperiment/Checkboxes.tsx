import React from "react";
import {
  Flex,
  RadioGroup as AdobeRadioGroup,
  Radio,
  Checkbox,
} from "@adobe/react-spectrum";
import { produce } from "immer";
import { TaskV0CheckboxGroup } from "@/core/types";
import {
  useSetStudy,
  useStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";

interface RadioGroupProps {
  taskType: TaskV0CheckboxGroup;
  taskIndex: number;
}

export const Checkboxes = (props: RadioGroupProps) => {
  const { taskType, taskIndex } = props;
  const currentValue = useStudy((study) => {
    const { pages } = study.content[study.group]!;
    const currentPage = pages[study.page_index]!;
    const currentTask = currentPage.tasks[taskIndex]!;
    const currentType = currentTask;

    if (currentType.tag === "checkbox_group") {
      return currentType.user_response;
    } else if (currentType.tag === "collection") {
      const theTask = currentType.tasks[
        currentType.task_collection_index
      ]! as TaskV0CheckboxGroup;
      return theTask.user_response;
    }
  });
  const setStudy = useSetStudy();
  return (
    <Flex direction="column" marginBottom="16px">
      <div dangerouslySetInnerHTML={{ __html: taskType.instructions }} />
      <Flex direction="column">
        {taskType.response_options.map((option) => {
          const isSelected = currentValue?.includes(option);
          return (
            <Checkbox
              isSelected={isSelected}
              onChange={() => {
                setStudy((prev) => {
                  return produce(prev, (study) => {
                    const { pages } = study.content[study.group]!;
                    const currentPage = pages[study.page_index]!;
                    const currentTask = currentPage.tasks[taskIndex]!;
                    const currentType = currentTask;
                    let userResponse: string[] = [];
                    if (currentType.tag === "checkbox_group") {
                      userResponse = currentType.user_response;
                    } else if (currentType.tag === "collection") {
                      const theTask = currentType.tasks[
                        currentType.task_collection_index
                      ]! as TaskV0CheckboxGroup;
                      userResponse = theTask.user_response;
                    }
                    if (isSelected) {
                      const idx = userResponse.findIndex(x => x === option);
                      userResponse.splice(idx, 1);
                    } else {
                      userResponse.push(option);
                    }
                  });
                });
              }}
              key={option}
            >
              {option}
            </Checkbox>
          );
        })}
      </Flex>
    </Flex>
  );
};
