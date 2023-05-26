import React from "react";
import { Flex, Heading, Text, View } from "@adobe/react-spectrum";
import { useStudy } from "@/components/Providers/StudyV0SubmissionProvider";

export const ThankYou = () => {
  const instructions = useStudy((study) => study.end_instructions);
  return (
    <Flex direction="column" gap="size-300" alignItems="center" marginY="size-300" marginX="size-100">
      {instructions ? (
        <div style={{ maxWidth: "600px" }} 
            dangerouslySetInnerHTML={{ __html: instructions }} 
          />
      ) : (
        <>
          <Heading level={3}>Thank you for completing the study.</Heading>
        </>
      )}
    </Flex>
  );
};
