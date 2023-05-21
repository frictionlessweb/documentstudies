import React from "react";
import { TextEntry } from "@/pages/RunningExperiment/TextEntry";
import { Collection } from "@/pages/RunningExperiment/Collection";
import { RadioGroup } from "@/pages/RunningExperiment/RadioGroup";
import { Highlights } from "@/pages/RunningExperiment/Highlights";
import { TaskV0 } from "@/core/types";

interface CurrentTaskProps {
  taskType: TaskV0;
  taskIndex: number;
}

export const Task = (props: CurrentTaskProps) => {
  const { taskType, taskIndex } = props;
  switch (taskType.tag) {
    case "text_entry": {
      return <TextEntry taskIndex={taskIndex} taskType={taskType} />;
    }
    case "radio_group": {
      return <RadioGroup taskIndex={taskIndex}  taskType={taskType} />;
    }
    case "collection": {
      return <Collection taskIndex={taskIndex}   taskType={taskType} />;
    }
    case "highlights": {
      return <Highlights taskIndex={taskIndex}   taskType={taskType} />;
    }
  }
};
