import React from "react";
import { Flex } from "@adobe/react-spectrum";
import { TaskTypeV0Collection } from "@/core/types";

interface TaskCollectionProps {
  taskType: TaskTypeV0Collection;
}

export const Collection = (props: TaskCollectionProps) => {
  return (
    <Flex>
      <p>Write me!</p>
    </Flex>
  );
};
