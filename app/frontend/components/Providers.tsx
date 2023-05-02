import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";

interface ProviderProps {
  children: React.ReactNode;
}

export const Providers = (props: ProviderProps) => {
  const { children } = props;
  return (
    <Provider
      colorScheme="light"
      theme={defaultTheme}
      UNSAFE_style={{ backgroundColor: "white" }}
    >
      {children}
    </Provider>
  );
};
