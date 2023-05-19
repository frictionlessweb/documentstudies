import React from "react";
import { Flex, ActionGroup, Item } from "@adobe/react-spectrum";
import { TaskTypeV0Collection } from "@/core/types";
import {
  useSetStudy,
  useStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";
import { produce } from "immer";
import { TaskType } from "./TaskType";

interface TaskCollectionProps {
  taskType: TaskTypeV0Collection;
  taskIndex: number;
}

type Tcol = TaskTypeV0Collection;

export const Collection = (props: TaskCollectionProps) => {
  const { taskIndex } = props;
  const { currentTask, instructions, curItem, itemsLength } = useStudy(
    (study) => {
      const { pages } = study.content[study.group]!;
      const currentPage = pages[study.page_index]!;
      const curType = currentPage.tasks[taskIndex]!.type as Tcol;
      return {
        curItem: curType.task_collection_index,
        itemsLength: curType.tasks.length,
        instructions: curType.instructions,
        currentTask: curType.tasks[curType.task_collection_index]!.type,
      };
    }
  );
  const setStudy = useSetStudy();
  return (
    <Flex direction="column">
      <div dangerouslySetInnerHTML={{ __html: instructions }} />
      <TaskType taskIndex={taskIndex} taskType={currentTask} />
      <ActionGroup
        marginBottom="16px"
        disabledKeys={(() => {
          if (curItem === 0) return ["previous"];
          if (curItem === itemsLength - 1) return ["next"];
          return [];
        })()}
        onAction={(key) => {
          const updateBy = key === "next" ? 1 : -1;
          setStudy((ctx) => {
            return produce(ctx, (study) => {
              const { pages } = study.content[study.group]!;
              const currentPage = pages[study.page_index]!;
              const currentTask = currentPage.tasks[taskIndex]!;
              const currentType = currentTask.type as TaskTypeV0Collection;
              currentType.task_collection_index += updateBy;
            });
          });
        }}
      >
        <Item key="previous">Previous</Item>
        <Item key="next">Next</Item>
      </ActionGroup>
    </Flex>
  );
};
