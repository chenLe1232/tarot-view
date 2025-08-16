#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 扫描目录中的 TypeScript/TSX 文件
function scanDirectory(dir, extensions = [".ts", ".tsx"]) {
  const files = [];

  function walk(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // 跳过 node_modules 和其他不需要的目录
        if (!["node_modules", ".git", "dist", ".vite"].includes(item)) {
          walk(fullPath);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  walk(dir);
  return files;
}

// 解析文件中的 import 语句
function parseImports(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const imports = [];

  // 匹配各种 import 语句的正则表达式
  const importRegexes = [
    // import ... from "package"
    /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+)?from\s+['"]([^'"]+)['"]/g,
    // import "package"
    /import\s+['"]([^'"]+)['"]/g,
    // import("package") - dynamic imports
    /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];

  for (const regex of importRegexes) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      const packageName = match[1];

      // 跳过相对路径导入
      if (!packageName.startsWith(".") && !packageName.startsWith("/")) {
        imports.push(packageName);
      }
    }
  }

  return imports;
}

// 清理包名，移除版本号
function cleanPackageName(packageName) {
  // 移除 @version 后缀
  const cleanName = packageName.replace(/@[\d.]+.*$/, "");

  // 对于 scoped packages (@org/package)，保持完整名称
  if (cleanName.startsWith("@") && cleanName.includes("/")) {
    return cleanName;
  }

  // 对于普通包，只取第一部分
  return cleanName.split("/")[0];
}

// 获取包的最新版本（简化版本，实际项目中可能需要调用 npm API）
function getLatestVersion(packageName) {
  // 这里返回 "latest"，实际使用时可以调用 npm registry API 获取真实版本
  const commonVersions = {
    react: "^18.3.0",
    "react-dom": "^18.3.0",
    typescript: "^5.2.2",
    vite: "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    tailwindcss: "^3.4.0",
    motion: "^11.0.4",
    "lucide-react": "^0.332.0",
    clsx: "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "class-variance-authority": "^0.7.1",
    "react-hook-form": "^7.55.0",
  };

  return commonVersions[packageName] || "latest";
}

// 主函数
function main() {
  const projectRoot = __dirname;
  const files = scanDirectory(projectRoot);
  const packageMap = {};

  console.log(`扫描到 ${files.length} 个 TypeScript/TSX 文件`);

  for (const file of files) {
    const imports = parseImports(file);

    for (const importPath of imports) {
      const cleanName = cleanPackageName(importPath);

      if (!packageMap[cleanName]) {
        packageMap[cleanName] = {
          name: cleanName,
          version: getLatestVersion(cleanName),
          files: [],
        };
      }

      // 记录哪些文件使用了这个包
      const relativePath = path.relative(projectRoot, file);
      if (!packageMap[cleanName].files.includes(relativePath)) {
        packageMap[cleanName].files.push(relativePath);
      }
    }
  }

  // 输出结果
  console.log("\n发现的包依赖:");
  console.log(JSON.stringify(packageMap, null, 2));

  // 保存到文件
  const outputPath = path.join(projectRoot, "detected-dependencies.json");
  fs.writeFileSync(outputPath, JSON.stringify(packageMap, null, 2));
  console.log(`\n结果已保存到: ${outputPath}`);

  // 生成 package.json 格式的依赖列表
  const dependencies = {};
  const devDependencies = {};

  // 简单分类：开发工具放到 devDependencies
  const devPackages = [
    "typescript",
    "vite",
    "@vitejs/plugin-react",
    "tailwindcss",
    "postcss",
    "autoprefixer",
    "eslint",
    "@types/",
    "@typescript-eslint/",
  ];

  for (const [name, info] of Object.entries(packageMap)) {
    const isDev = devPackages.some((devPkg) => name.includes(devPkg));

    if (isDev) {
      devDependencies[name] = info.version;
    } else {
      dependencies[name] = info.version;
    }
  }

  console.log("\n=== Dependencies ===");
  console.log(JSON.stringify(dependencies, null, 2));

  console.log("\n=== DevDependencies ===");
  console.log(JSON.stringify(devDependencies, null, 2));
}

// 运行脚本
main();
