import React from "react";
import { TextEntry } from "@/pages/RunningExperiment/TextEntry";
import { Collection } from "@/pages/RunningExperiment/Collection";
import { RadioGroup } from "@/pages/RunningExperiment/RadioGroup";
import { Highlights } from "@/pages/RunningExperiment/Highlights";
import { Checkboxes } from "@/pages/RunningExperiment/Checkboxes";
import { TaskV0 } from "@/core/types";
import { Flex } from "@adobe/react-spectrum";
import { isValidDocumentSource } from "@/utils/util";

interface CurrentTaskProps {
  taskType: TaskV0;
  taskIndex: number;
}

const TaskCore = (props: CurrentTaskProps) => {
  const { taskType, taskIndex } = props;
  switch (taskType.tag) {
    case "text_entry": {
      return <TextEntry taskIndex={taskIndex} taskType={taskType} />;
    }
    case "radio_group": {
      return <RadioGroup taskIndex={taskIndex} taskType={taskType} />;
    }
    case "collection": {
      return <Collection taskIndex={taskIndex} taskType={taskType} />;
    }
    case "highlights": {
      return <Highlights taskIndex={taskIndex} taskType={taskType} />;
    }
    case "checkbox_group": {
      return <Checkboxes taskIndex={taskIndex} taskType={taskType} />;
    }
  }
};

export const Task = (props: CurrentTaskProps) => {
  const { taskType } = props;
  return (
    <Flex direction="column" marginY="size-0">
      {isValidDocumentSource(taskType.document_source) && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: taskType.document_source!.instructions,
            }}
          />
          <p
            style={{
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
              margin: 0,
            }}
            onClick={async () => {
              if (window.annotationManager === null) return;
              try {
                await window.annotationManager.selectAnnotation(
                  taskType.document_source!.annotation.id
                );
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {taskType.document_source!.url_text}
          </p>
        </>
      )}
      <TaskCore {...props} />
    </Flex>
  );
};
