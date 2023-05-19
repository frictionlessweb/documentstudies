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

export interface StudyAssignment {
  id: string;
  study_id: string;
  group: string;
  results: FlexibleSchema;
}

export interface AssignmentCreationRequest {
  study_id: string;
  group: string;
}

type GroupId = string;

interface TaskTypeV0Base {
  id: string;
}

export interface TaskTypeV0TextResponse extends TaskTypeV0Base {
  tag: "text_entry";
  instructions: string;
  required: boolean;
  user_response: string;
  default_response: string;
  metadata: FlexibleSchema;
}

export interface TaskTypeV0RadioGroup extends TaskTypeV0Base {
  tag: "radio_group";
  instructions: string;
  response_options: string[];
  required: boolean;
  user_response: string;
  metadata: FlexibleSchema;
}

export interface TaskTypeV0Collection extends TaskTypeV0Base {
  tag: "collection";
  instructions: string;
  tasks: TaskV0[];
  metadata: FlexibleSchema;
  task_collection_index: number;
}

export interface TaskTypeV0DocumentHighlights extends TaskTypeV0Base {
  tag: "highlights";
  instructions: string;
  user_response: FlexibleSchema[];
  min_number: number;
  max_number: number;
  metadata: FlexibleSchema;
}

export type TaskTypeV0 =
  | TaskTypeV0TextResponse
  | TaskTypeV0RadioGroup
  | TaskTypeV0Collection
  | TaskTypeV0DocumentHighlights;

export interface TaskV0 {
  id: string;
  type: TaskTypeV0;
}

export interface PageV0 {
  id: string;
  instructions: string;
  page_layout: "text_layout" | "pdf_layout";
  pdf_document: string;
  tasks: TaskV0[];
}

export interface SchemaV0 {
  schema_version: "v0";
  metadata: {
    name: string;
    [otherKey: string]: unknown;
  };
  content: Record<GroupId, { pages: PageV0[] }>;
  page_index: number;
  group: string;
}
