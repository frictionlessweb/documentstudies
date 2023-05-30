import React from "react";
import { Flex, View } from "@adobe/react-spectrum";
import { LayoutProps } from "@/pages/RunningExperiment/types";

export const TextLayout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <Flex
      direction="column"
      width="600px"
      alignItems="center"
      marginY="size-0"
      gap="size-0"
    >
      <View borderTopWidth="thin" borderColor="light" width="100%"></View>
      <Flex
        width="100%"
        maxWidth="600px"
        minWidth="600px"
        direction="column"
        alignItems="center"
      >
        {children}
      </Flex>
    </Flex>
  );
};
