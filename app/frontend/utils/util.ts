import type {
  User,
  DocumentStudyDocument,
  Study,
  HasSchema,
  AssignmentCreationRequest,
  StudyAssignment,
  SchemaV0,
} from "@/core/types";
import { HTTP } from "@/utils/api";
import {
  SIGN_IN,
  SIGN_OUT,
  GET_ALL_DOCUMENTS,
  CREATE_DOCUMENTS,
  CREATE_STUDY,
  GET_ALL_STUDIES,
  CREATE_STUDY_ASSIGNMENT_PUBLIC,
  GET_ASSIGNMENT_BY_ID,
  GET_DOCUMENT_URL,
  GET_STUDY_URL,
  UPDATE_ASSIGNMENT,
  DELETE_STUDY,
  COMPLETED_ASSIGNMENTS_URL,
  DELETE_DOCUMENTS,
} from "@/utils/routes";

export const pickRandom = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)]!;
};

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

export const fetchAllStudies = async (): Promise<Study[]> => {
  return HTTP.get(GET_ALL_STUDIES);
};

export const createNewDocument = async (
  file: File
): Promise<DocumentStudyDocument> => {
  const formData = new FormData();
  formData.append("name", file.name);
  formData.append("file", file);
  const res: DocumentStudyDocument = await HTTP.postFormData(
    CREATE_DOCUMENTS,
    formData
  );
  return res;
};

export const createStudy = async (hasSchema: HasSchema) => {
  const res: Study = await HTTP.post(CREATE_STUDY, hasSchema);
  return res;
};

export const deleteStudy = async (studyId: string) => {
  const url = new URL(DELETE_STUDY, window.location.origin);
  url.searchParams.append("id", studyId);
  const apiUrl = url.toString();
  await HTTP.delete(apiUrl);
  return studyId;
};

export const getAssignmentById = async (
  id: string
): Promise<StudyAssignment | null> => {
  const url = new URL(GET_ASSIGNMENT_BY_ID, window.location.origin);
  url.searchParams.append("assignment_id", id);
  const apiUrl = url.toString();
  try {
    const res: StudyAssignment = await HTTP.get(apiUrl);
    return res;
  } catch (err) {
    return null;
  }
};

export const createAssignmentFromStudy = async (study: Study) => {
  const req = {
    study_id: study.id,
  };
  const res: StudyAssignment = await HTTP.post(
    CREATE_STUDY_ASSIGNMENT_PUBLIC,
    req
  );
  return res;
};

export const getDocumentByName = async (
  name: string
): Promise<{ url: string }> => {
  const url = new URL(GET_DOCUMENT_URL, window.location.origin);
  url.searchParams.append("document_name", name);
  const apiUrl = url.toString();
  const res: { url: string } = await HTTP.get(apiUrl);
  return res;
};

export const deleteDocument = async(documentId: string) => {
  const url = new URL(DELETE_DOCUMENTS, window.location.origin);
  url.searchParams.append("id", documentId);
  const apiURL = url.toString();
  await HTTP.delete(apiURL);
  return documentId
}

export const getStudyById = async (id: string): Promise<Study> => {
  const url = new URL(GET_STUDY_URL, window.location.origin);
  url.searchParams.append("study_id", id);
  const apiUrl = url.toString();
  const res = await HTTP.get(apiUrl);
  return res as Study;
};

export const fetchCompletedAssignments = async (
  id: string
): Promise<StudyAssignment[]> => {
  const url = new URL(COMPLETED_ASSIGNMENTS_URL, window.location.origin);
  url.searchParams.append("study_id", id);
  const apiUrl = url.toString();
  const res = await HTTP.get(apiUrl);
  return res as StudyAssignment[];
};

export const updateAssignment = async (
  assignmentId: string,
  results: SchemaV0
) => {
  const res: StudyAssignment = await HTTP.put(UPDATE_ASSIGNMENT, {
    assignment_id: assignmentId,
    results,
  });
  return res;
};

export const downloadJson = (json: object, name: string) => {
  const element = document.createElement("a");
  const textFile = new Blob([JSON.stringify(json)], {
    type: "text/plain",
  });
  element.href = URL.createObjectURL(textFile);
  element.download = `${name}.json`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const isValidDocumentSource = (document_source: any) => {
  if (document_source === undefined) return false;
  if (typeof document_source.annotation !== "object") return false;
  if (typeof document_source.url_text !== "string") return false;
  return typeof document_source.instructions === "string";
};
