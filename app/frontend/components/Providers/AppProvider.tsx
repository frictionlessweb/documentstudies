import React from "react";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { StateProvider } from "@/components/Providers/StateProvider";
import { ToastContainer } from "@react-spectrum/toast";

interface ProviderProps {
  children: React.ReactNode;
}

export const AppProvider = (props: ProviderProps) => {
  const { children } = props;
  return (
    <StateProvider>
      <Provider
        colorScheme="light"
        theme={defaultTheme}
        UNSAFE_style={{ backgroundColor: "white" }}
      >
        {children}
        <ToastContainer />
      </Provider>
    </StateProvider>
  );
};
