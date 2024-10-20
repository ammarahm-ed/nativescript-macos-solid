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
  setSnippets([{ language: "jsx", title, code }]);
};
// TESTING:
// setTimeout(() => {
//   const snippet = snippets()[0];
//   window.updateSnippet(
//     "Sample",
//     `<For each={snippets}>
//   {(snippet, index) => (
//     <CodeSnippet
//       language={snippet.language}
//       code={snippet.code}
//       index={index()}
//     />
//   )}
// </For>`
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
