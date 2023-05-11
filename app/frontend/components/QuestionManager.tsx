import React from "react";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import {
  Flex,
  ActionButton,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  Text,
  TextField,
  Picker,
  Item,
} from "@adobe/react-spectrum";
import { QUESTION_TYPE_LIST } from "@/core/types";
import { Loading } from "@/components/Loading";
import { ApiError } from "@/components/ApiError";

const useFetchQuestions = () => {
  const { list, areLoading, fetchAttempted, apiError } = useAppState(
    (state) => {
      return state.questions;
    }
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchDocuments = async () => {
      if (fetchAttempted) return;
      dispatch({ type: "INITIATE_QUESTION_FETCH" });
      try {
        throw new Error("Always fail");
      } catch (err) {
        dispatch({
          type: "QUESTION_FETCH_FAILURE",
          payload: "Api call failed.",
        });
      }
    };
    fetchDocuments();
  }, [dispatch, fetchAttempted]);
  return { list, areLoading, apiError };
};

interface QuestionCreateDialogProps {
  close: () => void;
}

const QuestionCreateDialog = (props: QuestionCreateDialogProps) => {
  const { close } = props;
  const createQuestions = React.useCallback(async () => {
    console.log('do something');
    close();
  }, []);
  return (
    <Dialog>
      <Heading>Create a Question</Heading>
      <Divider />
      <Content>
        <Flex direction="column">
          <Flex marginBottom="16px">
            <TextField label="Name" />
          </Flex>
          <Picker label="Type">
            {QUESTION_TYPE_LIST.map((type) => {
              return <Item key={type.value}>{type.display}</Item>;
            })}
          </Picker>
        </Flex>
      </Content>
      <ButtonGroup>
        <Button variant="secondary" onPress={close}>
          Cancel
        </Button>
        <Button variant="accent" onPress={createQuestions}>
          Create
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};

export const QuestionManager = () => {
  const { list, areLoading, apiError } = useFetchQuestions();
  if (areLoading) return <Loading />;
  return (
    <Flex direction="column">
      <Text>No questions found.</Text>
      <Flex marginTop="16px">
        <DialogTrigger>
          <ActionButton>Create Question</ActionButton>
          {(close) => <QuestionCreateDialog close={close} />}
        </DialogTrigger>
      </Flex>
    </Flex>
  );
};
