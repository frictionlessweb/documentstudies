import React from "react";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import {
  Flex,
  Button,
  ButtonGroup,
  Content,
  Dialog,
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
import { fetchAllQuestions } from "@/utils/util";
import { ApiError } from "@/components/ApiError";
import { useLocation } from "wouter";
import { CREATE_QUESTION_FORM } from "@/utils/routes";

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

export const QuestionManager = () => {
  const { list, areLoading, apiError } = useFetchQuestions();
  const [_, setLocation] = useLocation();
  const gotoCreateQuestion = React.useCallback(() => {
    setLocation(CREATE_QUESTION_FORM);
  }, [setLocation]);
  if (areLoading) return <Loading />;
  if (apiError) return <ApiError />;
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
        <Button variant="accent" onPress={gotoCreateQuestion}>
          Create Question
        </Button>
      </Flex>
    </Flex>
  );
};
