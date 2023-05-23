import React from "react";
import { Flex, Heading } from "@adobe/react-spectrum";
import { LayoutProps } from "@/pages/RunningExperiment/types";

export const TextLayout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Flex width="100%" maxWidth="600px" direction="column" alignItems="center">
      <Heading level={3}>TASKS</Heading>
      {children}
    </Flex>
  );
};
