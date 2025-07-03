import React from "react";
import ts from "typescript"

console.log('runtime', ts.SymbolFlags)

const App: React.FC = () => {
  return (
    <div>
      <h1>TypeScript Import Test App</h1>
      Ts symbol flag[0]: {ts.SymbolFlags[0]}
      <div id="editor-worker"></div>
    </div>
  );
};

export default App;
