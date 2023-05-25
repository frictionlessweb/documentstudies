import React from "react";
import { Flex } from "@adobe/react-spectrum";
import { useStudy } from "@/components/Providers/StudyV0SubmissionProvider";

export const ThankYou = () => {
  const instructions = useStudy((study) => study.end_instructions);
  return (
    <Flex direction="column">
      <div dangerouslySetInnerHTML={{ __html: instructions }} />
    </Flex>
  );
};
