import React from "react";
import { AdminProvider } from "@/components/Providers/AdminProvider";
import { StudiesOverview } from "@/pages/Studies/StudiesOverview";
import { Route, Switch } from "wouter";
import {
  ADMIN_PROTECTOR,
  STUDY_INIT_PROTECTOR,
  ASSIGNMENT_INIT_PROTECTOR,
} from "@/utils/routes";
import { InitiateStudy } from "@/pages/InitiateStudy";
import { RunningExperiment } from "@/pages/RunningExperiment/RunningExperiment";
import { NotFound } from "@/pages/NotFound";

export const Routes = () => {
  return (
    <Switch>
      <Route path={ADMIN_PROTECTOR}>
        <AdminProvider>
          <StudiesOverview />
        </AdminProvider>
      </Route>
      <Route path={STUDY_INIT_PROTECTOR}>
        <InitiateStudy />
      </Route>
      <Route path={ASSIGNMENT_INIT_PROTECTOR}>
        <RunningExperiment />
      </Route>
      <NotFound />
    </Switch>
  );
};
