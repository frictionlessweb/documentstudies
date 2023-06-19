import React from "react";
import { PageV0 } from "@/core/types";
import { TextLayout } from "@/pages/RunningExperiment/TextLayout";
import { PdfLayout } from "@/pages/RunningExperiment/PdfLayout";
import { Task } from "@/pages/RunningExperiment/Task";
import { NextButton } from "@/components/NextButton";
import { PreviousButton } from "@/components/PreviousButton";
import { Flex, Heading, Divider, ProgressBar } from "@adobe/react-spectrum";
import { useState } from "react";
import { useStudy } from "@/components/Providers/StudyV0SubmissionProvider";

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
  const [progress, maxValue] = useStudy((study) => {
    const { pages } = study.content[study.group]!;
    study.page_index
    return [study.page_index, pages.length]
  })
  return (
    <Flex direction="column" alignItems="center">
      <Heading level={3} marginBottom={0}>
        INSTRUCTIONS
      </Heading>
      <Flex maxWidth="600px" marginBottom="size-300" marginX="size-10">
        <div dangerouslySetInnerHTML={{ __html: page.instructions }} />
      </Flex>
      <Layout page={page}>
        <ProgressBar minValue={0} maxValue={maxValue} value={progress}/>
        <Flex direction="column" gap="size-350" marginY="size-200">
          {page.tasks.map((task, taskIndex) => {
            return (
              <> 
                <Task key={task.id} taskIndex={taskIndex} taskType={task} />
                <Divider size="S" maxWidth="100%" />
              </>
            );
          })}
          <Flex>
            <PreviousButton />
            <NextButton />
          </Flex>
        </Flex>
      </Layout>
    </Flex>
  );
};
