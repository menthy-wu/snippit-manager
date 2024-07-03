export const getLanguage = (path: string) => {
  path = path.toLowerCase();
  if (path.endsWith(".js")) return "JavaScript";
  if (path.endsWith(".ts")) return "TypeScript";
  if (path.endsWith(".py")) return "Python";
  if (path.endsWith(".java")) return "Java";
  if (path.endsWith(".html")) return "HTML";
  if (path.endsWith(".css")) return "CSS";
  if (path.endsWith(".json")) return "JSON";
  if (path.endsWith(".xml")) return "XML";
  if (path.endsWith(".sh")) return "Shell";
  if (path.endsWith(".md")) return "Markdown";
  if (path.endsWith(".yml")) return "YAML";
  if (path.endsWith(".sql")) return "SQL";
  if (path.endsWith(".rb")) return "Ruby";
  if (path.endsWith(".php")) return "PHP";
  if (path.endsWith(".c")) return "C";
  if (path.endsWith(".cpp")) return "C++";
  if (path.endsWith(".cs")) return "C#";
  if (path.endsWith(".go")) return "Go";
  if (path.endsWith(".rs")) return "Rust";
  if (path.endsWith(".swift")) return "Swift";
  if (path.endsWith(".kt")) return "Kotlin";
  if (path.endsWith(".scala")) return "Scala";
  if (path.endsWith(".r")) return "R";
  if (path.endsWith(".lua")) return "Lua";
  if (path.endsWith(".pl")) return "Perl";
  if (path.endsWith(".dart")) return "Dart";
  if (path.endsWith(".groovy")) return "Groovy";
  if (path.endsWith(".vue")) return "Vue";
  if (path.endsWith(".svelte")) return "Svelte";
  return "plaintext";
};
export const changeExtenstion = (fileName: string, language: string) => {
  if (language === "plaintext") return fileName;
  if (extensionMap[language] === undefined) return fileName;
  const ext = extensionMap[language];
  const name = fileName.split(".")[0];
  return `${name}${ext}`;
};
export const extensionMap: { [key: string]: string } = {
  JavaScript: ".js",
  TypeScript: ".ts",
  Python: ".py",
  Java: ".java",
  HTML: ".html",
  CSS: ".css",
  JSON: ".json",
  XML: ".xml",
  Shell: ".sh",
  Markdown: ".md",
  YAML: ".yml",
  SQL: ".sql",
  Ruby: ".rb",
  PHP: ".php",
  C: ".c",
  "C++": ".cpp",
  "C#": ".cs",
  Go: ".go",
  Rust: ".rs",
  Swift: ".swift",
  Kotlin: ".kt",
  Scala: ".scala",
  R: ".r",
  Lua: ".lua",
  Perl: ".pl",
  Dart: ".dart",
  Groovy: ".groovy",
  Vue: ".vue",
  Svelte: ".svelte",
};
