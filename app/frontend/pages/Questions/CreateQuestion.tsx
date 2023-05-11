import React from "react";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import {
  Flex,
  Button,
  ButtonGroup,
  TextField,
  TextArea,
  Picker,
  Item,
  Heading,
} from "@adobe/react-spectrum";
import { QUESTION_TYPES, QUESTION_TYPE_LIST } from "@/core/types";
import { Question } from "@/core/types";
import { createQuestions } from "@/utils/util";
import { produce } from "immer";
import { ToastQueue } from "@react-spectrum/toast";

const notFinished = (question: Omit<Question, "id">) => {
  return (
    question.name === "" ||
    question.question_type.type === "" ||
    question.instructions === ""
  );
};

export const CreateQuestion = () => {
  const areLoading = useAppState((state) => {
    return state.questions.areLoading;
  });
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
      dispatch({ type: "INITIATE_QUESTION_UPDATE" });
      const request = {
        questions: [formState],
      };
      const res = await createQuestions(request);
      dispatch({ type: "QUESTION_CREATION_ENDED", payload: res[0] });
      ToastQueue.positive("Question created successfully.");
    } catch (err) {
      ToastQueue.negative(
        "An error occurred while creating the question. Please refresh the page and try again."
      );
      dispatch({ type: "QUESTION_CREATION_ENDED", payload: null });
    }
  }, [formState, dispatch]);
  return (
    <Flex direction="column">
      <Heading level={3}>Create Question</Heading>
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
        <Flex marginBottom="16px" maxWidth="600px">
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
      <Flex marginTop="16px">
        <ButtonGroup>
          <Button
            variant="secondary"
            onPress={() => {
              window.history.back();
            }}
          >
            Back
          </Button>
          <Button
            isDisabled={notFinished(formState) || areLoading}
            variant="accent"
            onPress={makeNewQuestion}
          >
            Create
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
};
