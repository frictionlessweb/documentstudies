import React from "react";
import { PageV0 } from "@/core/types";
import { TextLayout } from "@/pages/RunningExperiment/TextLayout";
import { PdfLayout } from "@/pages/RunningExperiment/PdfLayout";
import { Task } from "@/pages/RunningExperiment/Task";
import { NextButton } from "@/components/NextButton";
import { Flex, Heading, Divider, View } from "@adobe/react-spectrum";

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
    <Flex direction="column" alignItems="center">
      <Heading level={3} marginBottom={0}>
        INSTRUCTIONS
      </Heading>
      <Flex maxWidth="600px" marginBottom="size-300" marginX="size-10">
        <div dangerouslySetInnerHTML={{ __html: page.instructions }} />
      </Flex>
      <Layout page={page}>
        <Flex direction="column" gap="size-350" marginY="size-200">
          {page.tasks.map((task, taskIndex) => {
            return (
              <>
                <Task key={task.id} taskIndex={taskIndex} taskType={task} />
                <Divider size="S" maxWidth="100%" />
              </>
            );
          })}
        <NextButton />
        </Flex>
      </Layout>
    </Flex>
  );
};
