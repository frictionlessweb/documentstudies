import React from "react";
import type { User } from "@/core/types";
import { AdminLayout } from "@/components/AdminLayout";
import { readUserCredentials, gotoSignIn } from "@/utils/util";

const CREDENTIALS = readUserCredentials();

const AdminContext = React.createContext<User | undefined>(undefined);

export const useCurrentAdmin = () => {
  const admin = React.useContext(AdminContext);
  if (admin === undefined) {
    throw new Error(
      "Please use useCurrentAdmin from inside the admin provider."
    );
  }
  return admin;
};

interface AdminProviderProps {
  children: React.ReactNode;
}

export const AdminProvider = (props: AdminProviderProps) => {
  const { children } = props;
  React.useEffect(() => {
    if (CREDENTIALS === null) {
      gotoSignIn();
    }
  }, []);
  if (CREDENTIALS === null) return null;
  return (
    <AdminContext.Provider value={CREDENTIALS}>
      <AdminLayout>{children}</AdminLayout>
    </AdminContext.Provider>
  );
};
