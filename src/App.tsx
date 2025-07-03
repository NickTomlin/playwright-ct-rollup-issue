import React from "react";
// comment this out to have npm run ct pass
import ts from "typescript"

const App: React.FC = () => {
  return (
    <div>
      <h1>TypeScript Import Test App</h1>
      {/* comment tout this to have npm run CT pass  */}
      Ts symbol flag[0]: {ts.SymbolFlags[0]}
      <div id="editor-worker"></div>
    </div>
  );
};

export default App;
