# Copilot Coding Agent Instructions for Tarot App

## 项目架构概览

- 本项目为 React（TypeScript）单页应用，主入口为 `App.tsx`，页面组件位于 `components/` 目录。
- 页面导航通过 `BottomNavigation.tsx` 组件和 `onNavigate` 回调实现，页面切换有动画。
- 主要页面包括：
  - `HomePage.tsx`（主页）
  - `DailyCardPage.tsx`（每日抽牌）
  - `DrawCardPage.tsx`（抽牌动画与交互）
  - `ShuffleAnimationPage.tsx`（洗牌动画）
  - `ChatPage.tsx`（AI 解读对话）
  - `ExplorePage.tsx`（塔罗知识探索）
  - `ProfilePage.tsx`（用户资料）
- 复用型 UI 组件集中在 `components/ui/`，如按钮、卡片、侧边栏、弹窗等，部分基于 shadcn/ui 和 Radix UI。
- 全局样式和主题变量定义在 `styles/globals.css`，大量使用 CSS 变量、渐变、玻璃拟态和动画。

## 关键开发约定

- **动画与交互**：大量使用 `framer-motion` 实现页面和组件的入场、切换、浮动、发光等动画，动画参数和交互细节需与现有页面风格保持一致。
- **视觉风格**：
  - 采用“液体玻璃”风格（如 `.glass-card`, `.liquid-card`），配合金色、霓虹紫、深蓝等主题色。
  - 按钮、卡片等组件有多种渐变和发光效果，详见 `globals.css`。
- **组件复用**：优先使用 `components/ui/` 下已有组件（如 `Button`, `Card`, `Sidebar` 等），避免重复造轮子。
- **Props 传递**：页面组件通过 `onNavigate` props 实现路由跳转，所有页面均应支持该回调。
- **命名规范**：类名、变量名、props 采用英文小驼峰，CSS 类名采用 kebab-case。
- **国际化**：界面文本以中文为主，部分辅助英文，新增页面/组件需保持一致。

## 典型开发流程

- **新增页面**：
  1. 在 `components/` 下新建页面组件，导出为默认函数，接收 `onNavigate` props。
  2. 在 `App.tsx` 的 `renderPage` 方法中注册新页面。
  3. 如需底部导航入口，更新 `BottomNavigation.tsx`。
- **样式扩展**：
  - 新增视觉风格请先在 `styles/globals.css` 定义变量和样式，再在组件中引用。
- **动画扩展**：
  - 参考现有 `motion.div` 用法，保持动画风格统一。

## 依赖与集成

- 依赖库：`framer-motion`, `@radix-ui/*`, `shadcn/ui`, `lucide-react`。
- 设计规范与组件用法详见 `guidelines/Guidelines.md`。
- 归属与素材说明见 `Attributions.md`。

## 重要示例

- 玻璃卡片用法：`<div className="glass-card">...</div>`
- 动画按钮用法：见 `DailyCardPage.tsx` 中“开始抽牌”按钮
- 侧边栏/弹窗等复合组件：优先用 `components/ui/` 下的封装

---

如需扩展功能、样式或动画，务必保持与现有风格和交互一致。遇到不确定的交互或风格，优先参考 `DailyCardPage.tsx`、`ShuffleAnimationPage.tsx`、`globals.css` 和 `Guidelines.md`。
