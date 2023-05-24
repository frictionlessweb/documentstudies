import React from "react";
import { Flex, Button } from "@adobe/react-spectrum";
import { createStudy as createNewStudy } from "@/utils/util";
import { useAppState, useDispatch } from "@/components/Providers/StateProvider";
import { ToastQueue } from "@react-spectrum/toast";

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
        dispatch({ type: "INITIATE_STUDY_API" });
        const res = await createNewStudy({ schema: theJson });
        dispatch({ type: "STUDY_CREATION_ENDED", payload: res });
        ToastQueue.positive("Study created successfully.");
      } catch (err) {
        console.error(err);
        dispatch({ type: "STUDY_CREATION_ENDED", payload: null });
        ToastQueue.negative(
          "An error occurred while creating the study. Please refresh the page and try again."
        );
      }
    },
    [dispatch]
  );
  return createStudy;
};

export const CreateStudyButton = () => {
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
          Create Study
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
