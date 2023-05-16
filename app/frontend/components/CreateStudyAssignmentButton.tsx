import React from "react";
import { Flex, Button } from "@adobe/react-spectrum";
import { createStudy as createNewStudy } from "@/utils/util";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";

const useCreateStudy = () => {
  const dispatch = useDispatch();
  const createStudy = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event?.target?.files;
      if (files === null) return;
      const file = files.item(0);
      if (file === null) return;
      const text = await file.text();
      const theJson = JSON.parse(text);
      try {
        dispatch({ type: "INITIATE_STUDY_CREATION" });
        const res = await createNewStudy({ schema: theJson });
        dispatch({ type: "STUDY_CREATION_ENDED", payload: res });
      } catch (err) {
        dispatch({ type: "STUDY_CREATION_ENDED", payload: null });
      }
    },
    [dispatch]
  );
  return createStudy;
};

export const CreateStudyAssignmentButton = () => {
  const createStudy = useCreateStudy();
  const isDisabled = useAppState((state) => state.studies.areLoading);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const triggerChange = () => {
    if (inputRef.current === null) return;
    inputRef.current.click();
  };
  return (
    <Flex direction="column">
      <Flex>
        <Button
          isDisabled={isDisabled}
          onPress={triggerChange}
          variant="accent"
        >
          Create Assignment
        </Button>
      </Flex>
      <input
        ref={inputRef}
        onChange={createStudy}
        style={{ display: "none" }}
        type="file"
        accept="application/json"
      />
    </Flex>
  );
};
