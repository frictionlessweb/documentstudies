import React from "react";
import { TaskTypeV0DocumentHighlights } from "@/core/types";
import { Flex, Well, Text } from "@adobe/react-spectrum";
import { useStudy } from "@/components/Providers/StudyV0SubmissionProvider";

interface HighlightsProps {
  taskType: TaskTypeV0DocumentHighlights;
  taskIndex: number;
}

export const Highlights = (props: HighlightsProps) => {
  const { taskType, taskIndex } = props;
  const numHighlights = useStudy((study) => {
    const { pages } = study.content[study.group]!;
    const currentPage = pages[study.page_index]!;
    const currentTask = currentPage.tasks[taskIndex]!;
    const currentType = currentTask.type as TaskTypeV0DocumentHighlights;
    return currentType.user_response.length;
  });
  return (
    <Flex direction="column">
      <div dangerouslySetInnerHTML={{ __html: taskType.instructions }} />
      <Well maxWidth="300px" marginBottom="size-350">
        <Text>Number of highlights: {numHighlights}</Text>
      </Well>
    </Flex>
  );
};
