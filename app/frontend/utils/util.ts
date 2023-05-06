import type { User } from "@/utils/types";
import { HTTP } from '@/utils/api';
import { SIGN_IN, SIGN_OUT } from "@/utils/routes";

/**
 * See app/views/layouts/application.html.erb - we load these variablers onto
 * the body of the page when the user is logged in.
 */
export const readUserCredentials = (): User | null => {
  const theBody = document.querySelector("body")!;
  const { adminName, adminEmail } = theBody.dataset;
  if (!adminName || !adminEmail) return null;
  return { name: adminName, email: adminEmail };
};

export const gotoSignIn = () => {
  window.location.href = SIGN_IN;
};

export const logout = async () => {
  await HTTP.delete(SIGN_OUT);
  gotoSignIn();
};
