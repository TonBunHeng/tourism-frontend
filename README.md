# AngkorVerse WebAdmin Panel

Welcome to the **AngkorVerse WebAdmin Panel** repository. This administrative dashboard serves as the central control hub for managing, moderating, and curating all content, user data, and system configurations before they are published to the **AngkorVerse** mobile application.

## Core Objectives
- **Content Curation:** Review, approve, and manage historical data, 3D/AR assets, tour guides, audio descriptions, and multimedia content related to Angkor archaeological sites.
- **User Management:** Oversee application users, manage administrator roles, monitor account status, and handle access permissions.
- **Analytics & Monitoring:** Track user engagement, application usage statistics, and system performance metrics in real time.
- **System Settings:** Configure localization (languages and currencies), push notifications, and third-party API integrations.

## Frontend Technology Stack
- **Framework:** React.js (Single Page Application)
- **Language:** JavaScript (ES6+)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (Utility-first CSS framework)
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Code Quality:** ESLint

<!-- Planned Technologies -->
<!--
- State Management: Context API / Redux Toolkit / TanStack Query
- HTTP Client: Axios (with JWT authentication interceptors)
-->

## Installation & Development

### Install and Run the Development Server
- `npm install` (Install project dependencies)
- `npm install tailwindcss @tailwindcss/vite` (Install Tailwind CSS and the Vite plugin)
- `npm run dev` (Start the development server)
- `npm run build` (Build the project for production)

## Technologies & Libraries

### Core & Production Dependencies (6 Packages)
- **React 19** (`react`, `react-dom`) (Core UI library for building dynamic, component-based user interfaces)
- **React Router v7** (`react-router-dom`) (Handles client-side routing for single-page applications)
- **Tailwind CSS v4** (`tailwindcss`, `@tailwindcss/vite`) (Utility-first CSS framework integrated with Vite)
- **Lucide React** (`lucide-react`) (Lightweight icon library for modern user interfaces)

### Development & Tooling Dependencies (9 Packages)
- **Vite** (`vite`, `@vitejs/plugin-react`) (Fast development server and optimized production build tool)
- **ESLint** (`eslint`) (JavaScript linting tool for maintaining code quality)
- **@eslint/js** (Official ESLint JavaScript configuration)
- **eslint-plugin-react-hooks** (Enforces React Hooks best practices)
- **eslint-plugin-react-refresh** (Provides React Fast Refresh linting support)
- **globals** (Predefined global variables for ESLint)
- **@types/react** (Type definitions for React)
- **@types/react-dom** (Type definitions for React DOM)

### IF can't run the project fix and barch this cmd
- `npm install recharts` 
- `npm install jspdf`
- `npm install jspdf-autotable`
- `npm install xlsx`
### Or 
- `npm install recharts jspdf jspdf-autotable xlsx`