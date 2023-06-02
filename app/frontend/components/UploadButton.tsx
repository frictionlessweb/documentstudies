import React from "react";
import { Button, SpectrumButtonProps } from "@adobe/react-spectrum";

interface FileUploadButtonProps extends SpectrumButtonProps {
  onFileUpload: (file: File) => void | Promise<void>;
  accept?: string;
}

export const UploadButton = (props: FileUploadButtonProps) => {
  const { onFileUpload, accept } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const triggerInput = React.useCallback(() => {
    if (inputRef.current === null) return null;
    inputRef.current.click();
  }, [inputRef]);
  return (
    <>
      <Button {...props} onPress={triggerInput} />
      <input
        onChange={(e) => {
          const file = e.target.files?.item(0);
          console.log(e.target.files);
          if (!file) return;
          onFileUpload(file);
        }}
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
      />
    </>
  );
};
