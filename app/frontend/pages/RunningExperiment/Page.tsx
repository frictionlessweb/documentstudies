import React from "react";
import { PageV0 } from "@/core/types";
import { TextLayout } from "@/pages/RunningExperiment/TextLayout";
import { PdfLayout } from "@/pages/RunningExperiment/PdfLayout";
import { TaskType } from "@/pages/RunningExperiment/TaskType";
import { NextButton } from "@/components/NextButton";

interface PageProps {
  page: PageV0;
}

const LAYOUT_MAP = {
  text_layout: TextLayout,
  pdf_layout: PdfLayout,
};

export const Page = (props: PageProps) => {
  const { page } = props;
  const Layout = LAYOUT_MAP[page.page_layout];
  return (
    <Layout page={page}>
      {page.tasks.map((task, taskIndex) => {
        return <TaskType key={task.id} taskIndex={taskIndex} taskType={task.type} />;
      })}
      <NextButton />
    </Layout>
  );
};
