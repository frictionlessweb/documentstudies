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

interface TaskV0Base {
  id: string;
  document_source?: {
    instructions: string; // HTML
    url_text: string; // The text of the link to the place
    annotation: FlexibleSchema;
  };
}

export interface TaskV0TextResponse extends TaskV0Base {
  tag: "text_entry";
  instructions: string;
  required: boolean;
  user_response: string;
  default_response: string;
  metadata: FlexibleSchema;
}

export interface TaskV0RadioGroup extends TaskV0Base {
  tag: "radio_group";
  instructions: string;
  response_options: string[];
  required: boolean;
  user_response: string;
  metadata: FlexibleSchema;
}

export interface TaskV0CheckboxGroup extends TaskV0Base {
  tag: "checkbox_group";
  instructions: string;
  response_options: string[];
  min_selected: number;
  max_selected: number;
  user_response: string[];
  metadata: FlexibleSchema;
}

export interface TaskV0Collection extends TaskV0Base {
  tag: "collection";
  instructions: string;
  tasks: TaskV0[];
  metadata: FlexibleSchema;
  task_collection_index: number;
}

export interface TaskV0DocumentHighlights extends TaskV0Base {
  tag: "highlights";
  instructions: string;
  user_response: FlexibleSchema[];
  min_number: number;
  max_number: number;
  metadata: FlexibleSchema;
}

export interface TaskV0DocumentHighlights extends TaskV0Base {
  tag: "highlights";
  instructions: string;
  user_response: FlexibleSchema[];
  min_number: number;
  max_number: number;
  metadata: FlexibleSchema;
}

export type TaskV0 =
  | TaskV0TextResponse
  | TaskV0RadioGroup
  | TaskV0Collection
  | TaskV0DocumentHighlights
  | TaskV0CheckboxGroup;

export interface PageV0 {
  id: string;
  instructions: string;
  page_layout: "text_layout" | "pdf_layout";
  document_id: string;
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
  start_instructions: string;
  end_instructions: string;
}
