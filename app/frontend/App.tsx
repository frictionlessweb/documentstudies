import React from "react";
import { AppProvider } from "@/components/Providers/AppProvider";
import { Routes } from "@/Routes";

export const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};
