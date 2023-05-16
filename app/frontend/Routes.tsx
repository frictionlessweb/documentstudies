import React from "react";
import { AdminProvider } from "@/components/Providers/AdminProvider";
import { StudiesOverview } from "@/pages/Studies/StudiesOverview";
import { Route, Switch } from "wouter";
import { RunningExperiment } from "@/pages/RunningExperiment/RunningExperiment";
import { NotFound } from "@/pages/NotFound";
import { ADMIN_PROTECTOR } from "@/utils/routes";

export const Routes = () => {
  return (
    <Switch>
      <Route path={ADMIN_PROTECTOR}>
        <AdminProvider>
          <StudiesOverview />
        </AdminProvider>
      </Route>
      <RunningExperiment />
    </Switch>
  );
};
