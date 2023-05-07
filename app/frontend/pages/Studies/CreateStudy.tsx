import React from "react";
import { Flex, Heading, Button } from "@adobe/react-spectrum";
import { StudiesTable } from "@/components/Studies/StudiesTable";
import { STUDIES_OVERVIEW } from "@/utils/routes";
import { useLocation } from "wouter";

export const CreateStudy = () => {
  const [_, setLocation] = useLocation();
  const gotoCreateStudy = React.useCallback(() => {
    setLocation(STUDIES_OVERVIEW);
  }, [setLocation]);
  return (
    <Flex direction="column">
      <Heading marginTop={0} level={2}>
        Create Study
      </Heading>
      <Flex>
        <Button onPress={gotoCreateStudy} variant="accent">
          Go Home
        </Button>
      </Flex>
    </Flex>
  );
};
