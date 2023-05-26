import React from "react";
import { TextEntry } from "@/pages/RunningExperiment/TextEntry";
import { Collection } from "@/pages/RunningExperiment/Collection";
import { RadioGroup } from "@/pages/RunningExperiment/RadioGroup";
import { Highlights } from "@/pages/RunningExperiment/Highlights";
import { TaskV0 } from "@/core/types";
import { Flex } from "@adobe/react-spectrum";

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
  }
};

export const Task = (props: CurrentTaskProps) => {
  const { taskType } = props;
  return (
    <Flex direction="column" marginY="size-0">
      {taskType.documentSource !== undefined && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: taskType.documentSource.instructions,
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
                  taskType.documentSource!.annotation.id
                );
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {taskType.documentSource.urlText}
          </p>
        </>
      )}
      <TaskCore {...props} />
    </Flex>
  );
};
