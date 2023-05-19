import React from "react";
import { Flex } from "@adobe/react-spectrum";
import { TaskTypeV0RadioGroup } from "@/core/types";

interface RadioGroupProps {
  taskType: TaskTypeV0RadioGroup;
  taskIndex: number;
}

export const RadioGroup = (props: RadioGroupProps) => {
  return (
    <Flex>
      <p>Write me!</p>
    </Flex>
  );
};
