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
  let list = useListData({
    initialItems: options.map((option) => {
      return {
        id: option,
        type: "file",
        name: option,
      };
    }),
  });
  const { dragAndDropHooks } = useDragAndDrop({
    // Only allow move operations when dropping items from this list
    getAllowedDropOperations: () => ["move"],
    getItems: (keys) =>
      [...keys].map((key) => {
        const item = list.getItem(key);
        // Setup the drag types and associated info for each dragged item.
        return {
          "custom-app-type": JSON.stringify(item),
          "text/plain": item.name,
        };
      }),
    onDrop: (e) => {
      const items = e.items;
      if (e.target.type === "item") {
        if (e.target.dropPosition === "on") {
          const item = list.getItem(e.target.key);
          list.update(e.target.key, {
            ...item,
          });
        } else if (e.target.dropPosition === "before") {
          list.insertBefore(e.target.key);
          console.log('before');
        } else if (e.target.dropPosition === "after") {
          list.insertAfter(e.target.key);
          console.log('after')
        } else {
          console.log('this ran');
        }
      }
      console.log(list);
    },
  });
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
