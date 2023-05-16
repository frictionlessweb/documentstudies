import React from "react";
import { Flex, Heading } from "@adobe/react-spectrum";
import { DocumentManager } from "@/components/DocumentManager";
import { StudyTable } from "@/components/StudyTable";
import { CreateStudyButton } from "@/components/CreateStudyButton";
import { StudyAssignmentTable } from "@/components/StudyAssignmentTable";
import { CreateStudyAssignmentButton } from "@/components/CreateStudyAssignmentButton";

export const StudiesOverview = () => {
  return (
    <Flex wrap="wrap">
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
      <Flex direction="column">
        <Heading marginTop={0} level={2}>
          Manage Study Assignments
        </Heading>
        <Flex marginBottom="16px" direction="column">
          <StudyAssignmentTable />
        </Flex>
        <CreateStudyAssignmentButton />
      </Flex>
    </Flex>
  );
};
