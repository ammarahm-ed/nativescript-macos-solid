import { For } from 'solid-js';
import CodeSnippet from './components/CodeSnippet';

const snippets = [
  {
    language: 'jsx',
    code: `<For each={snippets}>
  {(snippet, index) => (
    <CodeSnippet
      language={snippet.language}
      code={snippet.code}
      index={index()}
    />
  )}
</For>`,
  },
];

function App() {
  return (
    <div class="mx-auto my-0">
      <For each={snippets}>
        {(snippet, index) => (
          <CodeSnippet
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
