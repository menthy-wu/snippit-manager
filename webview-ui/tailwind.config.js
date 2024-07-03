import { nextui } from "@nextui-org/theme";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#af73d8",
        red: "#FF1E58",
        "editor-input-background": "var(--vscode-tab-inactiveBackground)",
        "sidebar-input-background": "var(--vscode-input-background)",
        "sideBar-foreground": "var(--vscode-sideBar-foreground)",
        "sideBar-background": "var(--vscode-sideBar-background)",
        "input-background": "var(--vscode-input-background)",
        "editorHint-foreground": "var(--vscode-editorHint-foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {},
    }),
  ],
};
