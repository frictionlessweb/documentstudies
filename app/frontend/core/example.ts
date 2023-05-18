import type { SchemaV0 } from "./types";

const foo: SchemaV0 = {
  schema: "v0",
  metadata: {
    name: "test",
  },
  study_content: {
    metadata: {},
    pages: [
      {
        id: "1",
        instructions: "test",
        page_layout: "text_layout",
        pdf_document: "",
        tasks: [
          {
            id: "1",
            type: {
              id: "foo",
              tag: "text_entry",
              content: {
                group1: [
                  {
                    instructions: "",
                    user_response: "",
                    default_response: "",
                    metadata: {},
                  },
                ],
              },
              required: true,
            },
          },
        ],
      },
      {
        id: "1",
        instructions: "test",
        page_layout: "pdf_layout",
        pdf_document: "Example.pdf",
        tasks: [
          {
            id: "1",
            type: {
              id: "bar",
              tag: "text_entry",
              content: {
                group2: [
                  {
                    instructions: "",
                    user_response: "",
                    default_response: "",
                    metadata: {},
                  },
                ],
              },
              required: true,
            },
          },
        ],
      },
    ],
  },
};
