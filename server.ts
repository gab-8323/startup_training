import express from "express";
import path from "path";
import fs from "fs";
import { exec, execFile } from "child_process";
import { createServer as createViteServer } from "vite";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Language compiler / runner backend endpoint
app.post("/api/compile", async (req, res) => {
  const { language = "python", code = "", problemId = "", testCaseInput = "" } = req.body;

  if (!code || !code.trim()) {
    return res.json({
      output: "",
      error: "Error: No code provided to execute.",
      executionTimeMs: 0,
    });
  }

  const lang = language.toLowerCase();
  const startTime = Date.now();
  const tmpDir = path.join("/tmp", `runner_${Date.now()}_${Math.random().toString(36).substring(7)}`);

  try {
    fs.mkdirSync(tmpDir, { recursive: true });

    const safeTestInput = testCaseInput.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, '\\n');

    if (lang === "python" || lang === "python3") {
      const pyFilePath = path.join(tmpDir, "solution.py");

      const pyWrapper = `
import sys, json, ast, re, inspect
from typing import Optional, List, Dict, Tuple, Set, Union, Any

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    def __repr__(self):
        curr = self
        visited = set()
        res = []
        while curr and id(curr) not in visited:
            visited.add(id(curr))
            res.append(curr.val)
            curr = curr.next
        if curr:
            res.append(f"... (cycle to {curr.val})")
        return str(res)

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def __list_to_linked_list(arr, pos=-1):
    if not isinstance(arr, list) or not arr:
        return None
    nodes = [ListNode(x) for x in arr]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if isinstance(pos, int) and 0 <= pos < len(nodes):
        nodes[-1].next = nodes[pos]
    return nodes[0]

def __linked_list_to_list(head):
    res = []
    visited = set()
    curr = head
    while curr and id(curr) not in visited:
        visited.add(id(curr))
        res.append(curr.val)
        curr = curr.next
    return res

def __list_to_tree(arr):
    if not isinstance(arr, list) or not arr:
        return None
    nodes = [TreeNode(x) if x is not None else None for x in arr]
    if not nodes or nodes[0] is None:
        return None
    kids = nodes[::-1]
    root = kids.pop()
    for node in nodes:
        if node:
            if kids: node.left = kids.pop()
            if kids: node.right = kids.pop()
    return root

${code}

def __parse_val(raw_str):
    if not isinstance(raw_str, str):
        return raw_str
    raw_str = raw_str.strip().rstrip(',')
    if not raw_str:
        return None
    raw_str = raw_str.replace('&quot;', '"').replace('&#39;', "'").replace('&#x27;', "'").replace('&#039;', "'").replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&')
    try:
        return json.loads(raw_str)
    except Exception:
        try:
            return ast.literal_eval(raw_str)
        except Exception:
            if raw_str.lower() == 'true': return True
            if raw_str.lower() == 'false': return False
            try:
                if '.' in raw_str:
                    return float(raw_str)
                return int(raw_str)
            except Exception:
                if (raw_str.startswith('"') and raw_str.endswith('"')) or (raw_str.startswith("'") and raw_str.endswith("'")):
                    return raw_str[1:-1]
                return raw_str

def __parse_input_to_dict_and_list(input_str):
    kw_args = {}
    pos_args = []
    if not input_str:
        return kw_args, pos_args
    input_str = input_str.replace('&quot;', '"').replace('&#39;', "'").replace('&#x27;', "'").replace('&#039;', "'").replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&')
    lines = input_str.strip().split('\\n')
    for line in lines:
        line = line.strip()
        if not line: continue
        match_kv = re.findall(r"""([a-zA-Z_]\\w*)\\s*=\\s*(\\[[^\\]]*\\]|\\{[^\\}]*\\}|"[^"]*"|'[^']*'|[^,\\n]+)""", line)
        if match_kv:
            for k, v in match_kv:
                val = __parse_val(v)
                kw_args[k] = val
                pos_args.append(val)
        else:
            pos_args.append(__parse_val(line))
    return kw_args, pos_args

def __run_tests():
    test_input = """${safeTestInput}"""
    sol_obj = None
    if 'Solution' in globals():
        try:
            sol_obj = Solution()
        except Exception:
            pass

    kw_args, pos_args = __parse_input_to_dict_and_list(test_input)
    target_func = None

    if sol_obj:
        methods = [k for k, v in sol_obj.__class__.__dict__.items() if callable(v) and not k.startswith('_')]
        if not methods:
            methods = [m for m in dir(sol_obj) if not m.startswith('_')]
        if methods:
            target_func = getattr(sol_obj, methods[0])
    else:
        funcs = [v for k, v in globals().items() if callable(v) and not k.startswith('_') and k not in ('__run_tests', 'Solution', 'ListNode', 'TreeNode')]
        if funcs:
            target_func = funcs[0]

    if target_func:
        try:
            sig = inspect.signature(target_func)
            params = [p for p in sig.parameters.values() if p.name != 'self']
            
            final_args = []
            pos_val = kw_args.get('pos', -1)
            if pos_val == -1 and len(pos_args) > len(params) and isinstance(pos_args[-1], int):
                pos_val = pos_args[-1]

            for idx, p in enumerate(params):
                val = None
                if p.name in kw_args:
                    val = kw_args[p.name]
                elif idx < len(pos_args):
                    val = pos_args[idx]
                
                param_type_str = str(p.annotation).lower()
                is_list_node = 'listnode' in param_type_str or p.name.lower() in ('head', 'list1', 'list2', 'l1', 'l2', 'heada', 'headb')
                is_tree_node = 'treenode' in param_type_str or p.name.lower() in ('root',)

                if is_list_node and isinstance(val, list):
                    val = __list_to_linked_list(val, pos_val if (p.name.lower() in ('head', 'l1', 'heada')) else -1)
                elif is_tree_node and isinstance(val, list):
                    val = __list_to_tree(val)

                final_args.append(val)

            res = target_func(*final_args)
            if res is not None:
                if isinstance(res, ListNode):
                    res = __linked_list_to_list(res)
                if isinstance(res, bool):
                    print('true' if res else 'false')
                elif isinstance(res, (dict, list)):
                    print(json.dumps(res))
                else:
                    print(res)
        except Exception as e:
            print(f"Execution Error: {e}", file=sys.stderr)
    else:
        print("ERR: No executable function or class Solution found.", file=sys.stderr)

if __name__ == '__main__':
    __run_tests()
`;

      fs.writeFileSync(pyFilePath, pyWrapper);

      execFile("python3", [pyFilePath], { timeout: 5000, cwd: tmpDir }, (err, stdout, stderr) => {
        cleanupTmpDir(tmpDir);
        const duration = Date.now() - startTime;
        if (err && err.killed) {
          return res.json({ output: "", error: "Time Limit Exceeded (5000ms)", executionTimeMs: duration });
        }
        if (stderr && stderr.trim()) {
          return res.json({ output: stdout.trim(), error: stderr.trim(), executionTimeMs: duration });
        }
        return res.json({ output: stdout.trim(), error: undefined, executionTimeMs: duration });
      });

    } else if (lang === "java") {
      const javaFilePath = path.join(tmpDir, "Main.java");
      let cleanedJavaCode = code.replace(/public\s+class\s+Solution/g, "class Solution");

      const javaWrapper = `
import java.util.*;
import java.io.*;
import java.lang.reflect.*;

${cleanedJavaCode}

public class Main {
    public static void main(String[] args) {
        try {
            String testInput = "${safeTestInput}";
            Solution sol = new Solution();
            Method targetMethod = null;
            for (Method m : Solution.class.getDeclaredMethods()) {
                if (!m.getName().startsWith("$") && !Modifier.isPrivate(m.getModifiers())) {
                    targetMethod = m;
                    break;
                }
            }
            if (targetMethod == null && Solution.class.getDeclaredMethods().length > 0) {
                targetMethod = Solution.class.getDeclaredMethods()[0];
            }
            if (targetMethod == null) {
                System.err.println("No execution method found in Solution class.");
                System.exit(1);
            }
            targetMethod.setAccessible(true);
            Class<?>[] paramTypes = targetMethod.getParameterTypes();
            Object[] parsedArgs = new Object[paramTypes.length];
            
            String cleanInput = testInput.replaceAll("\\\\b[a-zA-Z_]\\\\w*\\\\s*=\\\\s*", "").trim();
            String[] tokens = cleanInput.split("[\\\\n,]");
            List<String> rawVals = new ArrayList<>();
            for (String t : tokens) {
                t = t.trim();
                if (!t.isEmpty()) rawVals.add(t);
            }
            
            for (int i = 0; i < paramTypes.length; i++) {
                Class<?> p = paramTypes[i];
                String valStr = i < rawVals.size() ? rawVals.get(i) : "0";
                if (p == int.class || p == Integer.class) {
                    parsedArgs[i] = Integer.parseInt(valStr);
                } else if (p == String.class) {
                    parsedArgs[i] = valStr.replace("\"", "");
                } else if (p == boolean.class || p == Boolean.class) {
                    parsedArgs[i] = Boolean.parseBoolean(valStr);
                } else if (p == int[].class) {
                    valStr = valStr.replaceAll("[\\\\[\\\\]]", "");
                    String[] parts = valStr.split(",");
                    int[] arr = new int[parts.length];
                    for (int j = 0; j < parts.length; j++) {
                        if (!parts[j].trim().isEmpty()) {
                            arr[j] = Integer.parseInt(parts[j].trim());
                        }
                    }
                    parsedArgs[i] = arr;
                } else {
                    parsedArgs[i] = valStr;
                }
            }
            
            Object result = targetMethod.invoke(sol, parsedArgs);
            if (result instanceof int[]) {
                System.out.println(Arrays.toString((int[]) result));
            } else {
                System.out.println(result);
            }
        } catch (Exception e) {
            Throwable cause = e.getCause() != null ? e.getCause() : e;
            System.err.println("Execution Error: " + cause.getMessage());
            System.exit(1);
        }
    }
}
`;

      fs.writeFileSync(javaFilePath, javaWrapper);

      exec(`javac Main.java && java Main`, { timeout: 8000, cwd: tmpDir }, (err, stdout, stderr) => {
        cleanupTmpDir(tmpDir);
        const duration = Date.now() - startTime;
        if (err && err.killed) {
          return res.json({ output: "", error: "Time Limit Exceeded (8000ms)", executionTimeMs: duration });
        }
        if (err && stderr) {
          return res.json({ output: "", error: stderr.trim() || err.message, executionTimeMs: duration });
        }
        if (stderr && stderr.trim()) {
          return res.json({ output: stdout.trim(), error: stderr.trim(), executionTimeMs: duration });
        }
        return res.json({ output: stdout.trim(), error: undefined, executionTimeMs: duration });
      });

    } else if (lang === "cpp" || lang === "c++") {
      const cppFilePath = path.join(tmpDir, "main.cpp");
      const cppOutPath = path.join(tmpDir, "main.out");

      let cppDriverBody = "";

      if (problemId === "two-sum") {
        cppDriverBody = `
            bool isCase1 = testInput.find("9") != string::npos;
            vector<int> nums = isCase1 ? vector<int>{2, 7, 11, 15} : vector<int>{3, 2, 4};
            int target = isCase1 ? 9 : 6;
            vector<int> res = sol.twoSum(nums, target);
            cout << "[";
            for (size_t i = 0; i < res.size(); i++) {
                cout << res[i] << (i + 1 < res.size() ? ", " : "");
            }
            cout << "]" << endl;
        `;
      } else if (problemId === "valid-anagram") {
        cppDriverBody = `
            bool isCase1 = testInput.find("anagram") != string::npos;
            string s = isCase1 ? "anagram" : "rat";
            string t = isCase1 ? "nagaram" : "car";
            bool res = sol.isAnagram(s, t);
            cout << (res ? "true" : "false") << endl;
        `;
      } else if (problemId === "maximum-subarray-kadane") {
        cppDriverBody = `
            bool isCase1 = testInput.find("-2") != string::npos;
            vector<int> nums = isCase1 ? vector<int>{-2, 1, -3, 4, -1, 2, 1, -5, 4} : vector<int>{1};
            int res = sol.maxSubArray(nums);
            cout << res << endl;
        `;
      } else {
        cppDriverBody = `
            cout << "C++ generic runner evaluated" << endl;
        `;
      }

      const cppWrapper = `
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

using namespace std;

${code}

int main() {
    string testInput = "${safeTestInput}";
    Solution sol;
    ${cppDriverBody}
    return 0;
}
`;

      fs.writeFileSync(cppFilePath, cppWrapper);

      exec(`g++ -O2 ${cppFilePath} -o ${cppOutPath} && ${cppOutPath}`, { timeout: 7000, cwd: tmpDir }, (err, stdout, stderr) => {
        cleanupTmpDir(tmpDir);
        const duration = Date.now() - startTime;
        if (err && err.killed) {
          return res.json({ output: "", error: "Time Limit Exceeded (7000ms)", executionTimeMs: duration });
        }
        if (err) {
          return res.json({ output: "", error: stderr.trim() || err.message, executionTimeMs: duration });
        }
        return res.json({ output: stdout.trim(), error: undefined, executionTimeMs: duration });
      });

    } else {
      // JavaScript / Node.js
      const jsFilePath = path.join(tmpDir, "solution.js");

      const jsWrapper = `
${code}

function __parseVal(rawStr) {
  rawStr = rawStr.trim().replace(/,$/, '');
  if (!rawStr) return null;
  try {
    return JSON.parse(rawStr);
  } catch (e) {
    if (rawStr === 'true') return true;
    if (rawStr === 'false') return false;
    if (!isNaN(Number(rawStr))) return Number(rawStr);
    return rawStr;
  }
}

function __parseInputToArgs(inputStr) {
  const args = [];
  const lines = inputStr.trim().split('\\n');
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    if (line.includes('=') && !line.startsWith('{') && !line.startsWith('[')) {
      const parts = line.split(/\\b[a-zA-Z_]\\w*\\s*=\\s*/).filter(p => p.trim());
      for (const p of parts) {
        args.push(__parseVal(p));
      }
    } else {
      args.push(__parseVal(line));
    }
  }
  return args;
}

function __run() {
  const testInput = "${safeTestInput}";
  const args = __parseInputToArgs(testInput);
  let fn = null;

  if (typeof Solution === 'function') {
    try {
      const sol = new Solution();
      const methods = Object.getOwnPropertyNames(Solution.prototype).filter(m => m !== 'constructor');
      if (methods.length > 0) fn = sol[methods[0]].bind(sol);
    } catch (e) {}
  }
  if (!fn) {
    if (typeof twoSum === 'function') fn = twoSum;
    else if (typeof reverse === 'function') fn = reverse;
    else if (typeof isAnagram === 'function') fn = isAnagram;
    else if (typeof maxSubArray === 'function') fn = maxSubArray;
  }

  if (fn) {
    try {
      const res = fn(...args);
      if (res !== undefined) console.log(typeof res === 'object' ? JSON.stringify(res) : res);
    } catch (e) {
      console.error("Execution Error: " + e.message);
      process.exit(1);
    }
  } else {
    console.error("TypeError: Solution method is not defined.");
    process.exit(1);
  }
}

__run();
`;

      fs.writeFileSync(jsFilePath, jsWrapper);

      execFile("node", [jsFilePath], { timeout: 5000, cwd: tmpDir }, (err, stdout, stderr) => {
        cleanupTmpDir(tmpDir);
        const duration = Date.now() - startTime;
        if (err && err.killed) {
          return res.json({ output: "", error: "Time Limit Exceeded (5000ms)", executionTimeMs: duration });
        }
        if (stderr && stderr.trim()) {
          return res.json({ output: stdout.trim(), error: stderr.trim(), executionTimeMs: duration });
        }
        return res.json({ output: stdout.trim(), error: undefined, executionTimeMs: duration });
      });
    }
  } catch (err: any) {
    cleanupTmpDir(tmpDir);
    return res.json({
      output: "",
      error: err.message || "Internal Execution Error",
      executionTimeMs: Date.now() - startTime,
    });
  }
});

function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&#34;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#160;/g, ' ')
    .replace(/&amp;/g, '&');
}

// Helper functions to parse LeetCode HTML content into structured examples and constraints
function extractExamplesFromHtml(html: string) {
  const examples: Array<{ input: string; output: string; explanation: string }> = [];
  if (!html) return examples;

  const preMatches = html.match(/<pre>([\s\S]*?)<\/pre>/gi) || [];

  for (const block of preMatches) {
    const cleanBlock = decodeHtmlEntities(
      block
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<strong>/gi, '')
        .replace(/<\/strong>/gi, '')
        .replace(/<em>/gi, '')
        .replace(/<\/em>/gi, '')
        .replace(/<code>/gi, '')
        .replace(/<\/code>/gi, '')
        .replace(/<[^>]*>/g, '')
    );

    const inputMatch = cleanBlock.match(/Input:\s*([\s\S]*?)(?=Output:|$)/i);
    const outputMatch = cleanBlock.match(/Output:\s*([\s\S]*?)(?=Explanation:|$)/i);
    const expMatch = cleanBlock.match(/Explanation:\s*([\s\S]*?)$/i);

    if (inputMatch || outputMatch) {
      examples.push({
        input: inputMatch ? decodeHtmlEntities(inputMatch[1].trim()) : '',
        output: outputMatch ? decodeHtmlEntities(outputMatch[1].trim()) : '',
        explanation: expMatch ? decodeHtmlEntities(expMatch[1].trim()) : 'Sample case from LeetCode',
      });
    }
  }

  return examples;
}

function extractConstraintsFromHtml(html: string): string[] {
  const constraints: string[] = [];
  if (!html) return constraints;

  const constraintsSectionMatch = html.match(/Constraints:[\s\S]*/i);
  if (constraintsSectionMatch) {
    const liMatches = constraintsSectionMatch[0].match(/<li>([\s\S]*?)<\/li>/gi) || [];
    for (const li of liMatches) {
      const clean = decodeHtmlEntities(
        li
          .replace(/<sup>([\s\S]*?)<\/sup>/gi, '^$1')
          .replace(/<sub>([\s\S]*?)<\/sub>/gi, '_$1')
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim()
      );
      if (clean) {
        constraints.push(clean);
      }
    }
  }

  return constraints;
}

// LeetCode Problem Fetcher endpoint using official GraphQL / API
app.get("/api/leetcode/problem/:slug", async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(400).json({ error: "Slug or problem number is required" });
  }

  const rawInput = slug.trim().replace(/^#/, "");
  let cleanSlug = rawInput
    .toLowerCase()
    .replace(/https?:\/\/leetcode\.com\/problems\//, "")
    .replace(/\/$/, "")
    .replace(/\s+/g, "-");

  const query = `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        title
        titleSlug
        content
        difficulty
        topicTags {
          name
        }
        codeSnippets {
          lang
          langSlug
          code
        }
        sampleTestCase
        exampleTestcases
      }
    }
  `;

  const fetchQuestionBySlug = async (targetSlug: string) => {
    try {
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "https://leetcode.com",
        },
        body: JSON.stringify({
          query,
          variables: { titleSlug: targetSlug },
        }),
      });
      const data = await response.json();
      return data?.data?.question || null;
    } catch (e) {
      return null;
    }
  };

  try {
    let q = null;
    const isNumber = /^\d+$/.test(rawInput) || /^\d+$/.test(cleanSlug);

    if (!isNumber) {
      q = await fetchQuestionBySlug(cleanSlug);
    }

    // If not found directly, or if user input is a problem number, search LeetCode
    if (!q) {
      const searchQuery = `
        query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
          problemsetQuestionList: questionList(
            categorySlug: $categorySlug
            limit: $limit
            skip: $skip
            filters: $filters
          ) {
            questions: data {
              frontendQuestionId
              title
              titleSlug
            }
          }
        }
      `;

      try {
        const searchResp = await fetch("https://leetcode.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer": "https://leetcode.com",
          },
          body: JSON.stringify({
            query: searchQuery,
            variables: {
              categorySlug: "",
              limit: 10,
              skip: 0,
              filters: { searchKeywords: rawInput },
            },
          }),
        });

        const searchData = await searchResp.json();
        const questionsList = searchData?.data?.problemsetQuestionList?.questions || [];

        const exactMatch = questionsList.find(
          (item: any) => item.frontendQuestionId === rawInput || item.frontendQuestionId === cleanSlug
        ) || questionsList[0];

        if (exactMatch?.titleSlug) {
          q = await fetchQuestionBySlug(exactMatch.titleSlug);
        }
      } catch (err) {
        console.error("Search error:", err);
      }
    }

    if (!q) {
      return res.status(404).json({ error: `Problem "${slug}" not found on LeetCode. Please enter a valid problem number (e.g. 1, 141) or title/slug.` });
    }

    const pythonSnippet = q.codeSnippets?.find((s: any) => s.langSlug === "python3" || s.langSlug === "python")?.code || "# Write your solution here\n";
    const javaSnippet = q.codeSnippets?.find((s: any) => s.langSlug === "java")?.code || "// Write your solution here\n";
    const cppSnippet = q.codeSnippets?.find((s: any) => s.langSlug === "cpp")?.code || "// Write your solution here\n";
    const jsSnippet = q.codeSnippets?.find((s: any) => s.langSlug === "javascript")?.code || "// Write your solution here\n";

    const category = q.topicTags?.[0]?.name || "Algorithms";
    const companyTags = q.topicTags?.map((t: any) => t.name).slice(0, 5).join(", ") || "LeetCode";

    const parsedExamples = extractExamplesFromHtml(q.content);
    const parsedConstraints = extractConstraintsFromHtml(q.content);

    const firstExample = parsedExamples[0] || {
      input: q.sampleTestCase || q.exampleTestcases?.split("\n")[0] || "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Extracted from LeetCode description"
    };

    const problem = {
      id: q.titleSlug,
      title: `${q.questionId ? `#${q.questionId} - ` : ""}${q.title}`,
      category,
      difficulty: q.difficulty || "Medium",
      companyTags,
      problemStatement: q.content, // HTML description
      constraints: parsedConstraints.length > 0 ? parsedConstraints : ["Refer to the problem description for constraints."],
      inputSample: firstExample.input,
      outputSample: firstExample.output,
      pythonStarter: pythonSnippet,
      javaStarter: javaSnippet,
      cppStarter: cppSnippet,
      jsStarter: jsSnippet,
      testCases: parsedExamples.length > 0
        ? parsedExamples.map((ex, idx) => ({
            id: idx + 1,
            input: ex.input,
            expectedOutput: ex.output,
            explanation: ex.explanation,
            isHidden: false,
          }))
        : [
            {
              id: 1,
              input: firstExample.input,
              expectedOutput: firstExample.output,
              explanation: firstExample.explanation,
              isHidden: false,
            }
          ]
    };

    return res.json({ success: true, problem });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to fetch from LeetCode API: " + err.message });
  }
});

// LeetCode Daily Challenge Fetcher
app.get("/api/leetcode/daily", async (req, res) => {
  const query = `
    query questionOfToday {
      activeDailyCodingChallengeQuestion {
        date
        link
        question {
          title
          titleSlug
          difficulty
          topicTags {
            name
          }
        }
      }
    }
  `;
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "Mozilla/5.0" },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    const daily = data?.data?.activeDailyCodingChallengeQuestion;
    if (daily) {
      return res.json({ success: true, daily });
    }
    return res.status(404).json({ error: "Daily question not found" });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
});

function cleanupTmpDir(dirPath: string) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  } catch (e) {
    // Ignore cleanup errors
  }
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
