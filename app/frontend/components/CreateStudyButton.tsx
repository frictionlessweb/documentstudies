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
      try {
        dispatch({ type: "INITIATE_STUDY_API" });
        for (const file of files) {
          const text = await file.text();
          const theJson = JSON.parse(text);
          const res = await createNewStudy({ schema: theJson });
          dispatch({ type: "STUDY_CREATION_ENDED", payload: res });
        }
        ToastQueue.positive("Studies created successfully.");
      } catch (err) {
        ToastQueue.negative(
          // @ts-expect-error - We know it should have this key.
          err?.message ||
            "An unexpected error occurred. Please refresh the page and try again."
        );
        dispatch({ type: "STUDY_CREATION_ENDED", payload: null });
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
          aria-label="Upload a study"
        >
          Upload
        </Button>
      </Flex>
      <input
        ref={inputRef}
        onChange={createStudy}
        style={{ display: "none" }}
        type="file"
        multiple
        accept="application/json"
      />
    </Flex>
  );
};
