import React from "react";
import { AdminProvider } from "@/components/Providers/AdminProvider";
import { StudiesOverview } from "@/pages/Studies/StudiesOverview";
import { CreateStudy } from "@/pages/Studies/CreateStudy";
import { CreateQuestion } from "@/pages/Questions/CreateQuestion";
import { Route, Switch } from "wouter";
import { NotFound } from "@/pages/NotFound";
import {
  STUDIES_OVERVIEW,
  CREATE_STUDY,
  ADMIN_PROTECTOR,
  CREATE_QUESTION_FORM,
} from "@/utils/routes";

export const Routes = () => {
  return (
    <Switch>
      <Route path={ADMIN_PROTECTOR}>
        <AdminProvider>
          <Switch>
            <Route path={STUDIES_OVERVIEW}>
              <StudiesOverview />
            </Route>
            <Route path={CREATE_STUDY}>
              <CreateStudy />
            </Route>
            <Route path={CREATE_QUESTION_FORM}>
              <CreateQuestion />
            </Route>
          </Switch>
        </AdminProvider>
      </Route>
      <NotFound />
    </Switch>
  );
};
