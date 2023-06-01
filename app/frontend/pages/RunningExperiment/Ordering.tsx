import React from "react";
import {
  Flex,
  RadioGroup as AdobeRadioGroup,
  useDragAndDrop,
  ListView,
  Item,
  Text,
  useListData,
  ListOptions,
} from "@adobe/react-spectrum";
import { produce } from "immer";
import { TaskV0Ordering } from "@/core/types";
import {
  useSetStudy,
  useStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";

interface RadioGroupProps {
  taskType: TaskV0Ordering;
  taskIndex: number;
}

export const Ordering = (props: RadioGroupProps) => {
  const { taskType, taskIndex } = props;
  const options = useStudy((study) => {
    const { pages } = study.content[study.group]!;
    const currentPage = pages[study.page_index]!;
    const currentTask = currentPage.tasks[taskIndex]! as TaskV0Ordering;
    return currentTask.options;
  });
  const setStudy = useSetStudy();
  const list = useListData({
    initialItems: options.map((option) => {
      return {
        id: option,
        type: "file",
        name: option,
      };
    }),
  });
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => {
        const item = list.getItem(key);
        // Setup the drag types and associated info for each dragged item.
        return {
          "adobe-app": "adobe-app",
          "text/plain": item.name,
          [item.name]: item.name,
        };
      }),
    acceptedDragTypes: ["adobe-app"],
    onReorder: async (e) => {
      const { keys, target } = e;
      if (target.dropPosition === "before") {
        list.moveBefore(target.key, [...keys]);
      } else if (target.dropPosition === "after") {
        list.moveAfter(target.key, [...keys]);
      }
    },
    getAllowedDropOperations: () => ["move"],
  });
  React.useEffect(() => {
    const serializedItems = list.items.map((item) => item.id);
    if (JSON.stringify(serializedItems) === JSON.stringify(options)) {
      return;
    }
    setStudy((prev) => {
      return produce(prev, (study) => {
        const { pages } = study.content[study.group]!;
        const currentPage = pages[study.page_index]!;
        const currentTask = currentPage.tasks[taskIndex]! as TaskV0Ordering;
        currentTask.options = serializedItems;
      });
    });
  }, [list.items, options, setStudy, taskIndex]);
  return (
    <ListView
      aria-label="Droppable ListView in drop into folder example"
      width="size-3600"
      height="size-3600"
      dragAndDropHooks={dragAndDropHooks}
      items={list.items}
    >
      {(item) => (
        <Item key={item.id} textValue={item.name}>
          <Text>{item.name}</Text>
        </Item>
      )}
    </ListView>
  );
};
