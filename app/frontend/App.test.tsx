import React from 'react';
import { App } from "@/App";
import { render } from "@testing-library/react";

const serverHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>Document Studies</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="csrf-token" content="Cv_3zdS4yJIxuB7fMcvTiwcIJmNZC6sSW42JAx_HHN0hhladKFv8zvGzzCbjrjNPR1xqPo4a4wJVMN5igiVhag">
  </head>
  <body data-admin-name="Susan" data-admin-email="susan@test.com">
    <div id="root" />
  </body>
</html>
`;

describe("Our application", () => {
  test("Renders without crashing", () => {
    document.open();
    document.write(serverHtml);
    document.close();
    render(<App />);
  });
});
