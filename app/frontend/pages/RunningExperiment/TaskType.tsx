import React from "react";
import { TextEntry } from "@/pages/RunningExperiment/TextEntry";
import { Collection } from "@/pages/RunningExperiment/Collection";
import { RadioGroup } from "@/pages/RunningExperiment/RadioGroup";
import { Highlights } from "@/pages/RunningExperiment/Highlights";
import { TaskTypeV0 } from "@/core/types";

interface CurrentTaskProps {
  taskType: TaskTypeV0;
}

export const TaskType = (props: CurrentTaskProps) => {
  const { taskType } = props;
  switch (taskType.tag) {
    case "text_entry": {
      return <TextEntry taskType={taskType} />;
    }
    case "radio_group": {
      return <RadioGroup taskType={taskType} />;
    }
    case "collection": {
      return <Collection taskType={taskType} />;
    }
    case "highlights": {
      return <Highlights taskType={taskType} />;
    }
  }
};
