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
  TextArea,
  Picker,
  Item,
} from "@adobe/react-spectrum";
import { QUESTION_TYPES, QUESTION_TYPE_LIST } from "@/core/types";
import { Loading } from "@/components/Loading";
import { MultiSelect } from "@/components/MultiSelect";
import { Question } from "@/core/types";
import { fetchAllQuestions, createQuestions } from "@/utils/util";
import { produce } from "immer";
import { ApiError } from "@/components/ApiError";

const useFetchQuestions = () => {
  const { list, areLoading, fetchAttempted, apiError } = useAppState(
    (state) => {
      return state.questions;
    }
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetchQuestions = async () => {
      if (fetchAttempted) return;
      dispatch({ type: "INITIATE_QUESTION_FETCH" });
      try {
        const res = await fetchAllQuestions();
        dispatch({ type: "QUESTION_FETCH_SUCCESS", payload: res });
      } catch (err) {
        dispatch({
          type: "QUESTION_FETCH_FAILURE",
          payload: "Api call failed.",
        });
      }
    };
    fetchQuestions();
  }, [dispatch, fetchAttempted]);
  return { list, areLoading, apiError };
};

interface QuestionCreateDialogProps {
  close: () => void;
}

const notFinished = (question: Omit<Question, "id">) => {
  return (
    question.name === "" ||
    question.question_type.type === "" ||
    question.instructions === ""
  );
};

const QuestionCreateDialog = (props: QuestionCreateDialogProps) => {
  const { close } = props;
  const [formState, setFormState] = React.useState<Omit<Question, "id">>({
    name: "",
    instructions: "",
    question_type: {
      type: "",
    },
  });
  const dispatch = useDispatch();
  const makeNewQuestion = React.useCallback(async () => {
    try {
      const request = {
        questions: [formState],
      };
      const res = await createQuestions(request);
      dispatch({ type: "QUESTION_CREATION_ENDED", payload: res[0] });
    } catch (err) {
      console.error(err);
      dispatch({ type: "QUESTION_CREATION_ENDED", payload: null });
    }
    close();
  }, [close, formState, dispatch]);
  return (
    <Dialog>
      <Heading>Create a Question</Heading>
      <Divider />
      <Content>
        <Flex direction="column">
          <Flex marginBottom="16px">
            <TextField
              value={formState.name}
              onChange={(val) => {
                setFormState((prev) => {
                  return produce(prev, (draft) => {
                    draft.name = val;
                  });
                });
              }}
              label="Name"
            />
          </Flex>
          <Flex marginBottom="16px">
            <TextArea
              width="100%"
              value={formState.instructions}
              onChange={(val) => {
                setFormState((prev) => {
                  return produce(prev, (draft) => {
                    draft.instructions = val;
                  });
                });
              }}
              label="Instructions"
            />
          </Flex>
          <Picker
            selectedKey={formState.question_type.type as unknown as any}
            onSelectionChange={(choice) => {
              setFormState((prev) => {
                return produce(prev, (draft) => {
                  switch (choice as keyof typeof QUESTION_TYPES | "") {
                    case "FreeResponseQuestion": {
                      draft.question_type = {
                        type: choice as any,
                        text: "",
                      };
                      break;
                    }
                    case "": {
                      return;
                    }
                  }
                });
              });
            }}
            label="Type"
          >
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
        <Button
          isDisabled={notFinished(formState)}
          variant="accent"
          onPress={makeNewQuestion}
        >
          Create
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};

export const QuestionManager = () => {
  const { list, areLoading, apiError } = useFetchQuestions();
  if (areLoading) return <Loading />;
  console.log(list);
  return (
    <Flex direction="column">
      {list.length === 0 ? (
        <Text>No questions found.</Text>
      ) : (
        <>
          <MultiSelect label="Questions" selectedIds={[]} items={list} />
        </>
      )}
      <Flex marginTop="16px">
        <DialogTrigger>
          <ActionButton>Create Question</ActionButton>
          {(close) => <QuestionCreateDialog close={close} />}
        </DialogTrigger>
      </Flex>
    </Flex>
  );
};
