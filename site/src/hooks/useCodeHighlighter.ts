import { useEffect } from "react";
import hljs from "highlight.js";

export function useCodeHighlighter(content: string | undefined) {
  useEffect(() => {
    if (!content) return;

    const container = document.querySelector('.post-content');
    if (!container) return;

    container.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);

      const pre = block.parentElement;
      if (!pre || pre.querySelector('.copy-button')) return;

      const button = document.createElement('button');
      button.textContent = 'Copy';
      button.className =
        'copy-button absolute top-2 right-2 px-2 py-1 text-xs bg-gray-800 text-white rounded z-10';
      button.onclick = () => {
        navigator.clipboard.writeText((block as HTMLElement).innerText);
        button.textContent = 'Copied!';
        setTimeout(() => (button.textContent = 'Copy'), 1500);
      };

      pre.style.position = 'relative';
      pre.appendChild(button);
    });
  }, [content]);
}
