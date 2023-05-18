import React from "react";
import { TextEntry } from "@/pages/RunningExperiment/TextEntry";
import { Collection } from "@/pages/RunningExperiment/Collection";
import { RadioGroup } from "@/pages/RunningExperiment/RadioGroup";
import { Highlights } from "@/pages/RunningExperiment/Highlights";
import { useStudy } from "@/components/Providers/StudyV0SubmissionProvider";

export const CurrentTask = () => {
  const task = useStudy((state) => {
    const page = state.study_content.pages[state.page_index];
    if (page === undefined) {
      throw new Error("Page should not be undefined");
    }
    console.log(page.task_index);
    const task = page.tasks[page.task_index];
    if (task === undefined) {
      throw new Error("Task should not be undefined");
    }
    return task;
  });
  switch (task.type.tag) {
    case "text_entry": {
      return <TextEntry taskType={task.type} />;
    }
    case "radio_group": {
      return <RadioGroup taskType={task.type} />;
    }
    case "collection": {
      return <Collection taskType={task.type} />;
    }
    case "highlights": {
      return <Highlights taskType={task.type} />;
    }
  }
};
