import React from "react";

import * as ts from "./BIG_TS"

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
