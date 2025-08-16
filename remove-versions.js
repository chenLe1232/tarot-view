#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 扫描目录中的 TypeScript/TSX 文件
function scanDirectory(dir, extensions = ['.ts', '.tsx']) {
  const files = [];
  
  function walk(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 跳过 node_modules 和其他不需要的目录
        if (!['node_modules', '.git', 'dist', '.vite'].includes(item)) {
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

// 移除 import 语句中的版本号
function removeVersionsFromImports(content) {
  // 匹配 import 语句中的版本号模式
  // 例如: "@radix-ui/react-slot@1.1.2" -> "@radix-ui/react-slot"
  //      "class-variance-authority@0.7.1" -> "class-variance-authority"
  //      "lucide-react@0.487.0" -> "lucide-react"
  
  const versionRegex = /(['"])([@\w\-\/]+)@[\d\.\-\w]+(['"])/g;
  
  return content.replace(versionRegex, '$1$2$3');
}

// 处理单个文件
function processFile(filePath, dryRun = false) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const newContent = removeVersionsFromImports(content);
  
  if (content !== newContent) {
    const relativePath = path.relative(__dirname, filePath);
    console.log(`✓ 处理文件: ${relativePath}`);
    
    if (!dryRun) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`  已更新文件`);
    } else {
      console.log(`  [预览模式] 发现需要更新的导入语句`);
      
      // 显示变更预览
      const lines = content.split('\n');
      const newLines = newContent.split('\n');
      
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] !== newLines[i]) {
          console.log(`  第 ${i + 1} 行:`);
          console.log(`    - ${lines[i].trim()}`);
          console.log(`    + ${newLines[i].trim()}`);
        }
      }
    }
    
    return true;
  }
  
  return false;
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const help = args.includes('--help') || args.includes('-h');
  
  if (help) {
    console.log(`
使用方法: node remove-versions.js [选项]

选项:
  --dry-run, -d    预览模式，不实际修改文件
  --help, -h       显示帮助信息

示例:
  node remove-versions.js           # 直接修改文件
  node remove-versions.js --dry-run # 预览模式，查看将要修改的内容
    `);
    return;
  }
  
  const projectRoot = __dirname;
  const files = scanDirectory(projectRoot);
  
  console.log(`扫描到 ${files.length} 个 TypeScript/TSX 文件`);
  
  if (dryRun) {
    console.log('\n=== 预览模式 ===');
  } else {
    console.log('\n=== 开始处理文件 ===');
  }
  
  let processedCount = 0;
  
  for (const file of files) {
    if (processFile(file, dryRun)) {
      processedCount++;
    }
  }
  
  console.log(`\n完成！共处理 ${processedCount} 个文件`);
  
  if (dryRun) {
    console.log('运行 `node remove-versions.js` 来实际执行修改');
  }
}

// 运行脚本
main();
