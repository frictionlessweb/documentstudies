export interface User {
  name: string;
  email: string;
}

export interface DocumentStudyDocument {
  id: string;
  name: string;
  url: string;
}

interface FlexibleSchema {
  [x: string]: any;
}

export interface HasSchema {
  schema: FlexibleSchema;
}

export interface Study extends HasSchema {
  id: string;
  schema: FlexibleSchema;
}
