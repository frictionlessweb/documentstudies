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

interface ContentV0Base {
  instructions: string;
}

interface ContentV0TextResponse extends ContentV0Base {
  user_response: string;
  default_response: string;
  metadata: FlexibleSchema;
}

interface ContentV0RadioGroup extends ContentV0Base {
  user_response: string;
  metadata: FlexibleSchema;
}

interface ContentV0TaskTypeCollection {
  tasks: TaskV0[];
  metadata: FlexibleSchema;
  task_collection_index: number;
}

interface ContentV0DocumentHighlights {
  instructions: string;
  user_response: FlexibleSchema[];
  min_number: number;
  max_number: number;
  metadata: FlexibleSchema;
}

type GroupId = string;

interface TaskTypeV0Base {
  id: string;
}

interface TaskTypeV0TextResponse extends TaskTypeV0Base {
  tag: "text_entry";
  required: boolean;
  content: Record<GroupId, ContentV0TextResponse[]>;
}

interface TaskTypeV0RadioGroup extends TaskTypeV0Base {
  tag: "radio_group";
  response_options: string[];
  required: boolean;
  content: Record<GroupId, ContentV0RadioGroup[]>;
}

interface TaskTypeV0Collection extends TaskTypeV0Base {
  tag: "collection";
  instructions: string;
  content: Record<GroupId, ContentV0TaskTypeCollection[]>;
}

interface TaskTypeV0DocumentHighlights extends TaskTypeV0Base {
  tag: "highlights";
  instructions: string;
  content: Record<string, ContentV0DocumentHighlights[]>;
}

type TaskTypeV0 =
  | TaskTypeV0TextResponse
  | TaskTypeV0RadioGroup
  | TaskTypeV0Collection
  | TaskTypeV0DocumentHighlights;

interface TaskV0 {
  id: string;
  type: TaskTypeV0;
}

interface PageV0 {
  id: string;
  instructions: string;
  page_layout: "text_layout" | "pdf_layout";
  pdf_document: string;
  tasks: TaskV0[];
}

export interface SchemaV0 {
  schema: "v0";
  metadata: {
    name: string;
    [otherKey: string]: unknown;
  };
  study_content: {
    pages: PageV0[];
    metadata: FlexibleSchema;
  };
}
