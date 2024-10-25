import { For, createSignal } from "solid-js";
import CodeSnippet from "./components/CodeSnippet";

const [snippets, setSnippets] = createSignal([
  {
    language: "jsx",
    title: "",
    code: "",
  },
]);

// @ts-ignore
window.updateSnippet = (title: string, code: string) => {
  const data = JSON.parse(code);
  setSnippets([{ language: "jsx", title, code: decodeURIComponent(data.snippet) }]);
};
// TESTING:
// setTimeout(() => {
//   const snippet = snippets()[0];
//   window.updateSnippet(
//     "Sample",
//     `<button
//   onClick={(_event) => {
//     console.log("Button clicked");
//   }}
// >
//   Tap Me
// </button>`
//   );
// }, 1000);

function App() {
  return (
    <div class="mx-auto my-0">
      <For each={snippets()}>
        {(snippet, index) => (
          <CodeSnippet
            title={snippet.title}
            language={snippet.language}
            code={snippet.code}
            index={index()}
          />
        )}
      </For>
    </div>
  );
}

export default App;
