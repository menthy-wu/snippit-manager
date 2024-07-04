import { RiJavascriptFill, RiSvelteFill } from "react-icons/ri";
import {
  SiCplusplus,
  SiRuby,
  SiSwift,
  SiPhp,
  SiRust,
  SiGo,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiYaml,
  SiJson,
  SiPerl,
  SiApachegroovy,
  SiR,
  SiLua,
  SiScala,
  SiDart,
  SiCsharp,
} from "react-icons/si";
import { PiFileCSharpBold } from "react-icons/pi";
import { IoDocumentTextOutline, IoTerminal } from "react-icons/io5";
import { FaPython, FaJava } from "react-icons/fa";
import { TbSql, TbAssembly } from "react-icons/tb";
import { FaVuejs, FaXmarksLines } from "react-icons/fa6";
import { BsMarkdown } from "react-icons/bs";

export const Icon = (language: string, size = "text-sm") => {
  let colorClass;
  let backgroundColor;
  let icon;

  switch (language) {
    case "JavaScript":
      colorClass = "text-yellow-500";
      backgroundColor = "bg-yellow-500/30";
      icon = <RiJavascriptFill className={`${size} ${colorClass}`} />;
      break;
    case "C++":
      colorClass = "text-blue-600";
      backgroundColor = "bg-blue-600/30";
      icon = <SiCplusplus className={`${size} ${colorClass}`} />;
      break;
    case "C#":
      colorClass = "text-purple-500";
      backgroundColor = "bg-purple-500/30";
      icon = <PiFileCSharpBold className={`${size} ${colorClass}`} />;
      break;
    case "Shell":
      colorClass = "text-gray-500";
      backgroundColor = "bg-gray-500/30";
      icon = <IoTerminal className={`${size} ${colorClass}`} />;
      break;
    case "Python":
      colorClass = "text-blue-400";
      backgroundColor = "bg-blue-400/30";
      icon = <FaPython className={`${size} ${colorClass}`} />;
      break;
    case "Java":
      colorClass = "text-red";
      backgroundColor = "bg-red/30";
      icon = <FaJava className={`${size} ${colorClass}`} />;
      break;
    case "Ruby":
      colorClass = "text-red";
      backgroundColor = "bg-red/30";
      icon = <SiRuby className={`${size} ${colorClass}`} />;
      break;
    case "Swift":
      colorClass = "text-orange-400";
      backgroundColor = "bg-orange-400/30";
      icon = <SiSwift className={`${size} ${colorClass}`} />;
      break;
    case "PHP":
      colorClass = "text-purple-700";
      backgroundColor = "bg-purple-700/30";
      icon = <SiPhp className={`${size} ${colorClass}`} />;
      break;
    case "Rust":
      colorClass = "text-orange-600";
      backgroundColor = "bg-orange-600/30";
      icon = <SiRust className={`${size} ${colorClass}`} />;
      break;
    case "Go":
      colorClass = "text-teal-400";
      backgroundColor = "bg-teal-400/30";
      icon = <SiGo className={`${size} ${colorClass}`} />;
      break;
    case "TypeScript":
      colorClass = "text-blue-500";
      backgroundColor = "bg-blue-500/30";
      icon = <SiTypescript className={`${size} ${colorClass}`} />;
      break;
    case "HTML":
      colorClass = "text-orange-600";
      backgroundColor = "bg-orange-600/30";
      icon = <SiHtml5 className={`${size} ${colorClass}`} />;
      break;
    case "CSS":
      colorClass = "text-blue-400";
      backgroundColor = "bg-blue-400/30";
      icon = <SiCss3 className={`${size} ${colorClass}`} />;
      break;
    case "SQL":
      colorClass = "text-blue-800";
      backgroundColor = "bg-blue-800/30";
      icon = <TbSql className={`${size} ${colorClass}`} />;
      break;
    case "Assembly":
      colorClass = "text-gray-700";
      backgroundColor = "bg-gray-700/30";
      icon = <TbAssembly className={`${size} ${colorClass}`} />;
      break;
    case "XML":
      colorClass = "text-green-500";
      backgroundColor = "bg-green-500/30";
      icon = <FaXmarksLines className={`${size} ${colorClass}`} />;
      break;
    case "Markdown":
      colorClass = "text-white";
      backgroundColor = "bg-gray-500/30";
      icon = <BsMarkdown className={`${size} ${colorClass}`} />;
      break;
    case "JSON":
      colorClass = "text-yellow-500";
      backgroundColor = "bg-yellow-500/30";
      icon = <SiJson className={`${size} ${colorClass}`} />;
      break;
    case "YAML":
      colorClass = "text-blue-500";
      backgroundColor = "bg-blue-500/30";
      icon = <SiYaml className={`${size} ${colorClass}`} />;
      break;
    case "Vue":
      colorClass = "text-green-500";
      backgroundColor = "bg-green-500/30";
      icon = <FaVuejs className={`${size} ${colorClass}`} />;
      break;
    case "Perl":
      colorClass = "text-blue-500";
      backgroundColor = "bg-blue-500/30";
      icon = <SiPerl className={`${size} ${colorClass}`} />;
      break;
    case "Groovy":
      colorClass = "text-sky-500";
      backgroundColor = "bg-sky-500/30";
      icon = <SiApachegroovy className={`${size} ${colorClass}`} />;
      break;
    case "R":
      colorClass = "text-blue-500";
      backgroundColor = "bg-blue-500/30";
      icon = <SiR className={`${size} ${colorClass}`} />;
      break;
    case "Svelte":
      colorClass = "text-orange-500";
      backgroundColor = "bg-orange-500/30";
      icon = <RiSvelteFill className={`${size} ${colorClass}`} />;
      break;
    case "Lua":
      colorClass = "text-blue-500";
      backgroundColor = "bg-blue-500/30";
      icon = <SiLua className={`${size} ${colorClass}`} />;
      break;
    case "Scala":
      colorClass = "text-red";
      backgroundColor = "bg-red/30";
      icon = <SiScala className={`${size} ${colorClass}`} />;
      break;
    case "Dart":
      colorClass = "text-sky-500";
      backgroundColor = "bg-sky-500/30";
      icon = <SiDart className={`${size} ${colorClass}`} />;
      break;
    case "Smalltalk":
      colorClass = "text-blue-500";
      backgroundColor = "bg-blue-500/30";
      icon = <SiCsharp className={`${size} ${colorClass}`} />;
      break;
    default:
      colorClass = "text-gray-500";
      backgroundColor = "bg-gray-500/30";
      icon = <IoDocumentTextOutline className={`${size} ${colorClass}`} />;
  }
  return { icon: icon, color: "colorClass", backgroundColor: backgroundColor };
};
