import React from "react";
// this package should trigger the issue
import { createWorker, type WorkerShape } from "@valtown/codemirror-ts/worker";

// just to not have a linter yell at us
void createWorker;

const App: React.FC = () => {
  return (
    <div>
      <h1>TypeScript Import Test App</h1>
      <div id="editor-worker"></div>
    </div>
  );
};

export default App;
