import React from "react";
import { Flex } from "@adobe/react-spectrum";
import { TaskTypeV0TextResponse } from "@/core/types";

interface TextEntryProps {
  taskType: TaskTypeV0TextResponse;
}

export const TextEntry = (props: TextEntryProps) => {
  return (
    <Flex>
      <p>Write me!</p>
    </Flex>
  );
};
