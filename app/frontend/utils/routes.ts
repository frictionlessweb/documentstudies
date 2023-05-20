/* UI */
export const SIGN_IN = "/admins/sign_in";
export const SIGN_OUT = "/admins/sign_out";
export const ADMIN_PROTECTOR = "/admins/:path*";
export const STUDIES_OVERVIEW = "/admins";
export const CREATE_QUESTION_FORM = "/admins/create_questions";
export const STUDY_INIT_PROTECTOR = "/studies";
export const ASSIGNMENT_INIT_PROTECTOR = "/assignments";

/* API */
export const GET_ALL_DOCUMENTS = "/api/v1/all-documents";
export const CREATE_DOCUMENTS = "/api/v1/create-document";

export const GET_ALL_QUESTIONS = "/api/v1/all-questions";
export const CREATE_QUESTIONS = "/api/v1/create-questions";

export const GET_ALL_STUDIES = "/api/v1/all-studies";
export const CREATE_STUDY = "/api/v1/create-study";

export const CREATE_STUDY_ASSIGNMENT = "/api/v1/create-study-assignment";
export const GET_ALL_STUDY_ASSIGNMENTS = "/api/v1/all-study-assignments";
export const GET_ASSIGNMENT_BY_ID = "/api/v1/assignment-by-id";

export const GET_DOCUMENT_URL = "/api/v1/document-by-name";
export const GET_STUDY_URL = "/api/v1/study-by-id";
export const CREATE_STUDY_ASSIGNMENT_PUBLIC =
  "/api/v1/create-study-assignment-public";
