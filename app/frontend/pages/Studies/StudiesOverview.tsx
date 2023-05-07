import React from "react";
import { Flex, Heading, Button } from "@adobe/react-spectrum";
import { StudiesTable } from "@/components/Studies/StudiesTable";
import { DocumentManager } from "@/components/DocumentManager";
import { CREATE_STUDY } from "@/utils/routes";
import { useLocation } from "wouter";

export const StudiesOverview = () => {
  const [_, setLocation] = useLocation();
  const gotoCreateStudy = React.useCallback(() => {
    setLocation(CREATE_STUDY);
  }, [setLocation]);
  return (
    <Flex>
      <Flex direction="column" marginEnd="32px">
        <Heading marginTop={0} level={2}>
          Manage Studies
        </Heading>
        <StudiesTable />
        <Flex>
          <Button onPress={gotoCreateStudy} variant="accent">
            Create Study
          </Button>
        </Flex>
      </Flex>
      <Flex direction="column">
        <Heading marginTop={0} level={2}>
          Manage Documents
        </Heading>
        <DocumentManager />
      </Flex>
    </Flex>
  );
};
