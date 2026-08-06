import React, { useRef } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  language: 'python' | 'cpp' | 'java' | 'javascript';
  placeholder?: string;
  minLines?: number;
}

// Pure, crash-proof syntax highlighter for Python, C++, Java, and JavaScript
function highlightCode(code: string, language: string): string {
  if (!code) return '';

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const pythonKeywords = new Set(['def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'is', 'not', 'and', 'or', 'import', 'from', 'as', 'class', 'pass', 'break', 'continue', 'lambda', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'global', 'nonlocal', 'self']);
  const jsKeywords = new Set(['function', 'return', 'if', 'else', 'for', 'while', 'in', 'of', 'import', 'export', 'from', 'default', 'class', 'const', 'let', 'var', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new', 'typeof', 'instanceof', 'async', 'await']);
  const cppKeywords = new Set(['int', 'float', 'double', 'char', 'bool', 'void', 'auto', 'const', 'static', 'struct', 'class', 'public', 'private', 'protected', 'template', 'typename', 'using', 'namespace', 'include', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'delete', 'vector', 'string', 'cout', 'cin', 'endl']);
  const javaKeywords = new Set(['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'static', 'final', 'void', 'int', 'double', 'float', 'boolean', 'char', 'String', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'import', 'package', 'try', 'catch', 'finally', 'throw', 'throws']);
  const booleansAndNull = new Set(['True', 'False', 'None', 'true', 'false', 'null', 'undefined', 'NULL']);

  let keywords = jsKeywords;
  if (language === 'python') keywords = pythonKeywords;
  else if (language === 'cpp') keywords = cppKeywords;
  else if (language === 'java') keywords = javaKeywords;

  const lines = code.split('\n');

  const highlightLine = (line: string): string => {
    // Regex matches: comments, strings, words/identifiers, numbers, operators/punctuation
    const tokenRegex = /(#.*$|\/\/.*$|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b|[{}()\[\];,]|=|\+|-|\*|\/|%|<|>|!|&|\|)/g;

    let lastIndex = 0;
    let result = '';
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        result += escapeHtml(line.slice(lastIndex, match.index));
      }

      const token = match[0];
      const escapedToken = escapeHtml(token);

      if (token.startsWith('#') || token.startsWith('//') || token.startsWith('/*')) {
        result += `<span class="text-slate-500 italic">${escapedToken}</span>`;
      } else if (
        (token.startsWith('"') && token.endsWith('"')) ||
        (token.startsWith("'") && token.endsWith("'")) ||
        (token.startsWith('`') && token.endsWith('`'))
      ) {
        result += `<span class="text-emerald-400 font-medium">${escapedToken}</span>`;
      } else if (/^\d+(\.\d+)?$/.test(token)) {
        result += `<span class="text-orange-400 font-medium">${escapedToken}</span>`;
      } else if (booleansAndNull.has(token)) {
        result += `<span class="text-amber-400 font-semibold">${escapedToken}</span>`;
      } else if (keywords.has(token)) {
        result += `<span class="text-purple-400 font-bold">${escapedToken}</span>`;
      } else if (/^[a-zA-Z_]\w*$/.test(token)) {
        const remaining = line.slice(tokenRegex.lastIndex);
        if (/^\s*\(/.test(remaining)) {
          result += `<span class="text-sky-400 font-semibold">${escapedToken}</span>`;
        } else {
          result += `<span class="text-slate-200">${escapedToken}</span>`;
        }
      } else {
        result += `<span class="text-slate-400">${escapedToken}</span>`;
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      result += escapeHtml(line.slice(lastIndex));
    }

    return result;
  };

  return lines.map(highlightLine).join('\n');
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  placeholder = 'Write your solution here...',
  minLines = 16,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  // Synchronize scrolling between textarea, highlighted layer, and line numbers gutter
  const handleScroll = () => {
    if (textareaRef.current) {
      const { scrollTop, scrollLeft } = textareaRef.current;
      if (preRef.current) {
        preRef.current.scrollTop = scrollTop;
        preRef.current.scrollLeft = scrollLeft;
      }
      if (gutterRef.current) {
        gutterRef.current.scrollTop = scrollTop;
      }
    }
  };

  const highlightedCode = highlightCode(value, language);

  const lines = value.split('\n');
  const lineCount = Math.max(minLines, lines.length);

  return (
    <div className="relative flex-1 flex overflow-hidden bg-[#090d16] font-mono text-xs select-none">
      {/* Line Numbers Gutter */}
      <div
        ref={gutterRef}
        className="w-11 py-4 text-right pr-3 text-slate-500 bg-[#05080e] border-r border-slate-800/80 font-mono text-[11px] leading-relaxed overflow-hidden shrink-0 select-none"
      >
        {Array.from({ length: lineCount }, (_, i) => i + 1).map((num) => (
          <div key={num} className="h-[21px] flex items-center justify-end">
            {num}
          </div>
        ))}
      </div>

      {/* Code Container with Overlaid Highlighted Code Backdrop & Transparent Textarea */}
      <div className="relative flex-1 overflow-hidden">
        {/* Syntax Highlighted Output */}
        <pre
          ref={preRef}
          aria-hidden="true"
          className="absolute inset-0 p-4 m-0 font-mono text-xs leading-relaxed pointer-events-none whitespace-pre overflow-auto font-medium text-slate-200"
          style={{ tabSize: 4 }}
          dangerouslySetInnerHTML={{
            __html: highlightedCode + (value.endsWith('\n') ? '<br />' : ''),
          }}
        />

        {/* Interactive Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={(e) => {
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const val = value;

            if (e.key === 'Tab') {
              e.preventDefault();

              if (start !== end && val.substring(start, end).includes('\n')) {
                // Multi-line indent/unindent
                const firstLineStart = val.lastIndexOf('\n', start - 1) + 1;
                const lastLineEnd = val.indexOf('\n', end);
                const actualEnd = lastLineEnd === -1 ? val.length : lastLineEnd;

                const selectedBlock = val.substring(firstLineStart, actualEnd);
                const blockLines = selectedBlock.split('\n');

                let modifiedLines: string[];
                if (e.shiftKey) {
                  modifiedLines = blockLines.map(line => line.startsWith('    ') ? line.substring(4) : line.replace(/^\s{1,3}/, ''));
                } else {
                  modifiedLines = blockLines.map(line => '    ' + line);
                }

                const newBlock = modifiedLines.join('\n');
                const newVal = val.substring(0, firstLineStart) + newBlock + val.substring(actualEnd);
                onChange(newVal);

                setTimeout(() => {
                  if (textareaRef.current) {
                    textareaRef.current.selectionStart = firstLineStart;
                    textareaRef.current.selectionEnd = firstLineStart + newBlock.length;
                  }
                }, 0);
              } else if (e.shiftKey) {
                // Single-line unindent 4 spaces
                const lineStart = val.lastIndexOf('\n', start - 1) + 1;
                if (val.substring(lineStart, lineStart + 4) === '    ') {
                  const newVal = val.substring(0, lineStart) + val.substring(lineStart + 4);
                  onChange(newVal);
                  setTimeout(() => {
                    if (textareaRef.current) {
                      textareaRef.current.selectionStart = textareaRef.current.selectionEnd = Math.max(lineStart, start - 4);
                    }
                  }, 0);
                }
              } else {
                // Single-line indent 4 spaces
                const newVal = val.substring(0, start) + '    ' + val.substring(end);
                onChange(newVal);
                setTimeout(() => {
                  if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
                  }
                }, 0);
              }
            } else if (e.key === 'Enter') {
              e.preventDefault();

              // Auto Indentation on Enter key
              const lineStart = val.lastIndexOf('\n', start - 1) + 1;
              const currentLine = val.substring(lineStart, start);
              const indentMatch = currentLine.match(/^(\s*)/);
              let indent = indentMatch ? indentMatch[1] : '';

              const trimmedLine = currentLine.trim();
              const nextChar = val.charAt(start);

              const isBlockOpener =
                trimmedLine.endsWith(':') ||
                trimmedLine.endsWith('{') ||
                trimmedLine.endsWith('(') ||
                trimmedLine.endsWith('[') ||
                /^(if|elif|else|def|class|for|while|try|except|finally|with)\b/.test(trimmedLine);

              if (isBlockOpener) {
                indent += '    ';
              }

              // Special handling for hitting enter between { and }, or ( and ), or [ and ]
              const charBefore = val.charAt(start - 1);
              if (
                (charBefore === '{' && nextChar === '}') ||
                (charBefore === '(' && nextChar === ')') ||
                (charBefore === '[' && nextChar === ']')
              ) {
                const outerIndent = indentMatch ? indentMatch[1] : '';
                const newVal = val.substring(0, start) + '\n' + indent + '\n' + outerIndent + val.substring(end);
                onChange(newVal);

                setTimeout(() => {
                  if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1 + indent.length;
                  }
                }, 0);
                return;
              }

              const newVal = val.substring(0, start) + '\n' + indent + val.substring(end);
              onChange(newVal);

              setTimeout(() => {
                if (textareaRef.current) {
                  textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1 + indent.length;
                }
              }, 0);
            }
          }}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          placeholder={placeholder}
          className="absolute inset-0 p-4 m-0 font-mono text-xs leading-relaxed bg-transparent text-transparent caret-emerald-400 focus:outline-none resize-none overflow-auto whitespace-pre font-medium"
          style={{ tabSize: 4 }}
        />
      </div>
    </div>
  );
};
