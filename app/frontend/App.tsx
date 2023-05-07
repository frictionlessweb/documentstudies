import React from "react";
import { AppProvider } from "@/components/Providers/AppProvider";
import { AdminProvider } from "@/components/Providers/AdminProvider";
import { StudiesOverview } from "@/pages/Studies/StudiesOverview";
import { CreateStudy } from "@/pages/Studies/CreateStudy";
import { Route, Switch } from "wouter";
import { NotFound } from "@/pages/NotFound";
import { STUDIES_OVERVIEW, CREATE_STUDY } from "@/utils/routes";

export const App = () => {
  return (
    <AppProvider>
      <Switch>
        <Route path="/admins/:page*">
          <AdminProvider>
            <Switch>
              <Route path={STUDIES_OVERVIEW}>
                <StudiesOverview />
              </Route>
              <Route path={CREATE_STUDY}>
                <CreateStudy />
              </Route>
            </Switch>
          </AdminProvider>
        </Route>
        <NotFound />
      </Switch>
    </AppProvider>
  );
};
