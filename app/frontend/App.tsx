import React from "react";
import { AppProvider } from "@/components/Providers/AppProvider";
import { Route, Switch } from "wouter";
import { AdminOverview } from "@/pages/AdminOverview";
import { NotFound } from "@/pages/NotFound";

export const App = () => {
  return (
    <AppProvider>
      <Switch>
        <Route path="/admins/:page*">
          <AdminOverview />
        </Route>
        <NotFound />
      </Switch>
    </AppProvider>
  );
};
