import React from "react";
import { Flex, Heading, Text } from "@adobe/react-spectrum";
import { DocumentManager } from "@/components/DocumentManager";
import { StudyTable } from "@/components/StudyTable";
import { CreateStudyButton } from "@/components/CreateStudyButton";

export const StudiesOverview = () => {
  return (
    <Flex
      direction="column"
      marginY="size-300"
      marginX="size-500"
      gap="size-600"
    >
      <Flex direction="column" gap="size-100">
        <Heading marginTop={0} marginBottom={0} level={2}>
          Manage PDF Documents
        </Heading>
        <Text>Upload PDF documents that you will use in your study.</Text>
        <DocumentManager />
      </Flex>
      <Flex direction="column" gap="size-200">
        <Heading marginTop={0} marginBottom={0} level={2}>
          Manage Published Studies
        </Heading>
        <Text>Upload JSON specifying your study tasks.</Text>
        <Flex marginBottom="16px" direction="column">
          <StudyTable />
        </Flex>
        <CreateStudyButton />
      </Flex>
    </Flex>
  );
};
