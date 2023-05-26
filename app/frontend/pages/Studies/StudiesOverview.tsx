import React from "react";
import { Flex, Heading } from "@adobe/react-spectrum";
import { DocumentManager } from "@/components/DocumentManager";
import { StudyTable } from "@/components/StudyTable";
import { CreateStudyButton } from "@/components/CreateStudyButton";

export const StudiesOverview = () => {
  return (
    <Flex direction="column">
      <Flex direction="column" marginEnd="16px">
        <Heading marginTop={0} level={2}>
          Manage Documents
        </Heading>
        <DocumentManager />
      </Flex>
      <Flex direction="column" marginEnd="16px">
        <Heading marginTop={0} level={2}>
          Manage Studies
        </Heading>
        <Flex marginBottom="16px" direction="column">
          <StudyTable />
        </Flex>
        <CreateStudyButton />
      </Flex>
    </Flex>
  );
};
