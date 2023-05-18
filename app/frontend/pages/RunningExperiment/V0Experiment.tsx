import React from "react";
import type { SchemaV0, StudyAssignment, PageV0 } from "@/core/types";
import { Flex, Text } from "@adobe/react-spectrum";
import {
  useStudy,
  useSetStudy,
} from "@/components/Providers/StudyV0SubmissionProvider";
import { ThankYou } from "@/pages/RunningExperiment/ThankYou";
import { Page } from "@/pages/RunningExperiment/Page";

export const V0Experiment = () => {
  const { pageIndex, pages } = useStudy((study) => {
    const pageIndex = study.page_index;
    const pages = study.study_content.pages;
    return { pageIndex, pages };
  });
  const page = pages[pageIndex];
  const isFinished = pageIndex >= pages.length;
  return (
    <Flex direction="column" marginTop="16px" width="100%" alignItems="center">
      {isFinished ? <ThankYou /> : <Page page={page as PageV0} />}
    </Flex>
  );
};
