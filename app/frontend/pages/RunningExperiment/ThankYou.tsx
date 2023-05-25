import React from "react";
import { Flex, Heading, Text } from "@adobe/react-spectrum";
import { useStudy } from "@/components/Providers/StudyV0SubmissionProvider";

export const ThankYou = () => {
  const instructions = useStudy((study) => study.end_instructions);
  return (
    <Flex direction="column">
      {instructions ? (
        <div dangerouslySetInnerHTML={{ __html: instructions }} />
      ) : (
        <>
          <Heading level={3}>Thank you for completing the study.</Heading>
          <Text>If there are next steps, we will be in touch.</Text>
        </>
      )}
    </Flex>
  );
};
