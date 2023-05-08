import React from "react";
import {
  Flex,
  Heading,
  Button,
  TextField,
  TextArea,
} from "@adobe/react-spectrum";
import { StudiesTable } from "@/components/Studies/StudiesTable";
import { DocumentManager } from "@/components/DocumentManager";
import { QuestionManager } from '@/components/QuestionManager';
import { STUDIES_OVERVIEW } from "@/utils/routes";
import { useLocation } from "wouter";

export const CreateStudy = () => {
  const [_, setLocation] = useLocation();
  const gotoCreateStudy = React.useCallback(() => {
    setLocation(STUDIES_OVERVIEW);
  }, [setLocation]);
  return (
    <Flex direction="column" width="100%">
      <Heading marginTop={0} level={2}>
        Create Study
      </Heading>
      <Flex width="100%" marginBottom="32px">
        <Flex direction="column" marginEnd="16px">
          <Heading level={3}>Overview</Heading>
          <TextField label="Name" />
          <TextArea label="Description" />
          <Flex marginTop="16px">
            <DocumentManager />
          </Flex>
        </Flex>
        <Flex direction="column">
          <Heading level={3}>Questions</Heading>
          <QuestionManager />
        </Flex>
      </Flex>
      <Flex>
        <Button onPress={gotoCreateStudy} variant="accent">
          Go Home
        </Button>
      </Flex>
    </Flex>
  );
};
