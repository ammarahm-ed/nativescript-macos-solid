import { createSignal, onMount } from 'solid-js';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import { BiSolidCopy, BiSolidCheckCircle } from 'solid-icons/bi';

interface CodeSnippetProps {
  title: string;
  language: string;
  code: string;
  index: number;
}

const CodeSnippet = (props: CodeSnippetProps) => {
  const [copied, setCopied] = createSignal(false);

  onMount(() => {
    Prism.highlightAll();
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div class="space-y-8 max-w-lg mx-auto mt-2">
      <div class="shadow-md rounded-lg overflow-hidden">
        <div class="bg-gray-800 px-4 py-2 flex justify-between items-center">
          <div class="text-lg font-semibold text-white">
            {props.title}
          </div>
          <button
            onClick={copyToClipboard}
            class="text-gray-300 hover:text-white focus:outline-none"
          >
            {copied() ? (
              <BiSolidCheckCircle class="w-5 h-5" />
            ) : (
              <BiSolidCopy class="w-5 h-5" />
            )}
          </button>
        </div>
        <pre>
          <code class={`language-${props.language}`}>{props.code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
