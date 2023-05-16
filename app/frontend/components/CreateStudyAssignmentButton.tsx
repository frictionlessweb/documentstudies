import React from "react";
import {
  Flex,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  Picker,
  Item,
} from "@adobe/react-spectrum";
import { AssignmentCreationRequest } from "@/core/types";
import { createStudyAssignment } from "@/utils/util";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { produce } from "immer";

const useCreateStudyAssignment = (
  closeFn: () => void,
  formState: AssignmentCreationRequest
) => {
  const dispatch = useDispatch();
  const createStudy = React.useCallback(async () => {
    try {
      const res = await createStudyAssignment(formState);
      console.log(res);
    } finally {
      closeFn();
    }
  }, [dispatch, closeFn, formState]);
  return createStudy;
};

interface CreateStudyAssignmentModalProps {
  close: () => void;
}

const CreateStudyAssignmentModal = (props: CreateStudyAssignmentModalProps) => {
  const { close } = props;
  const [formState, setFormState] = React.useState({ study_id: "", group: "" });
  const studies = useAppState((state) => {
    return state.studies.list;
  });
  const submitDisabled = formState.study_id === "" || formState.group === "";
  const createAssignment = useCreateStudyAssignment(close, formState);
  return (
    <Dialog>
      <Heading>Create Study Assignment</Heading>
      <Divider />
      <Content>
        <Flex direction="column">
          <Picker
            onSelectionChange={(key) => {
              setFormState((prev) => {
                return produce(prev, (draft) => {
                  draft.study_id = key as string;
                  draft.group = "";
                });
              });
            }}
            label="Study Name"
            marginBottom="16px"
          >
            {studies.map((study) => {
              return (
                <Item key={study.id}>
                  {study?.schema?.metadata?.name || "No Name"}
                </Item>
              );
            })}
          </Picker>
          <Picker
            isDisabled={formState.study_id === ""}
            onSelectionChange={(key) => {
              setFormState((prev) => {
                return produce(prev, (draft) => {
                  draft.group = key as string;
                });
              });
            }}
            label="Study Group"
          >
            {Object.keys(
              studies.find((study) => study?.id === formState.study_id)?.schema
                ?.groups || {}
            ).map((group) => {
              return <Item key={group}>{group}</Item>;
            })}
          </Picker>
        </Flex>
      </Content>
      <ButtonGroup>
        <Button variant="secondary" onPress={close}>
          Cancel
        </Button>
        <Button
          isDisabled={submitDisabled}
          variant="accent"
          onPress={createAssignment}
        >
          Confirm
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};

export const CreateStudyAssignmentButton = () => {
  const isDisabled = useAppState((state) => state.studies.areLoading);
  return (
    <Flex direction="column">
      <DialogTrigger>
        <Flex>
          <Button
            isDisabled={isDisabled}
            onPress={() => {
              console.log("hi");
            }}
            variant="accent"
          >
            Create Assignment
          </Button>
        </Flex>
        {(close) => {
          return <CreateStudyAssignmentModal close={close} />;
        }}
      </DialogTrigger>
    </Flex>
  );
};
