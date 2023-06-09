import React from "react";
import { PageV0 } from "@/core/types";
import { TextLayout } from "@/pages/RunningExperiment/TextLayout";
import { PdfLayout } from "@/pages/RunningExperiment/PdfLayout";
import { Task } from "@/pages/RunningExperiment/Task";
import { NextButton } from "@/components/NextButton";
import { PreviousButton } from "@/components/PreviousButton";
import { Flex, Heading, Divider, Text } from "@adobe/react-spectrum";

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
      <Flex width="100%">
        <Text maxWidth="800px">
          If you need to come back to this study later, you may close this tab
          after finishing a page and save this link:{" "}
          <a href={window.location.href}>{window.location.href}</a>
        </Text>
      </Flex>
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
          <Flex>
            <PreviousButton />
            <NextButton />
          </Flex>
        </Flex>
      </Layout>
    </Flex>
  );
};
