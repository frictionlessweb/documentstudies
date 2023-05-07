import type { User, DocumentStudyDocument } from "@/core/types";
import { HTTP } from "@/utils/api";
import {
  SIGN_IN,
  SIGN_OUT,
  GET_ALL_DOCUMENTS,
  CREATE_DOCUMENTS,
} from "@/utils/routes";

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

export const fetchAllDocuments = async (): Promise<DocumentStudyDocument[]> => {
  return HTTP.get(GET_ALL_DOCUMENTS);
};

export const createNewDocument = async (
  file: File
): Promise<DocumentStudyDocument> => {
  const formData = new FormData();
  formData.append('name', file.name);
  formData.append('file', file);
  const res: DocumentStudyDocument = await HTTP.postFormData(CREATE_DOCUMENTS, formData);
  return res;
};
