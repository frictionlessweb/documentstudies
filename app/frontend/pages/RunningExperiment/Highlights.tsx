import React from "react";
import { TaskTypeV0DocumentHighlights } from "@/core/types";
import { Flex } from "@adobe/react-spectrum";

interface HighlightsProps {
  taskType: TaskTypeV0DocumentHighlights;
}

export const Highlights = (props: HighlightsProps) => {
  return (
    <Flex>
      <p>Write me!</p>
    </Flex>
  );
};
