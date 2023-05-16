export interface User {
  name: string;
  email: string;
}

export interface DocumentStudyDocument {
  id: string;
  name: string;
  url: string;
}

export interface HasSchema {
  schema: object;
}

export interface Study extends HasSchema {
  id: string;
  schema: object;
}
