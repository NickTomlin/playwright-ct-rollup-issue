import { autocompletion } from "@codemirror/autocomplete";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView, basicSetup } from "codemirror";
import * as Comlink from "comlink";
import type ts from "typescript";
import {
  tsAutocompleteWorker,
  tsFacetWorker,
  tsHoverWorker,
  tsLinterWorker,
  tsSyncWorker,
} from "@valtown/codemirror-ts";
import { createWorker, type WorkerShape } from "@valtown/codemirror-ts/worker";

function renderDisplayParts(dp: ts.SymbolDisplayPart[]) {
  const div = document.createElement("div");
  for (const part of dp) {
    const span = div.appendChild(document.createElement("span"));
    span.className = `quick-info-${part.kind}`;
    span.innerText = part.text;
  }
  return div;
}

(async () => {
  const path = "index.ts";

  // TODO: this is the one place where we can't use .js urls
  const innerWorker = new Worker(new URL("./worker.ts", import.meta.url), {
    type: "module",
  });
  const worker = Comlink.wrap(innerWorker) as WorkerShape;
  await worker.initialize();

  const editor = new EditorView({
    doc: `let hasAnError: string = 10;

function increment(num: number) {
  return num + 1;
  //     ^?
}

increment('not a number');`,
    extensions: [
      basicSetup,
      javascript({
        typescript: true,
        jsx: true,
      }),
      tsFacetWorker.of({ worker, path }),
      tsSyncWorker(),
      tsLinterWorker(),
      autocompletion({
        override: [
          tsAutocompleteWorker(),
        ],
      }),
      tsHoverWorker(),
    ],
    parent: document.querySelector("#editor-worker")!,
  });
})().catch((e) => console.error(e));
