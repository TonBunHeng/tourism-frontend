## AngkorVerse WebAdmin Panel. 
- Welcome to the AngkorVerse WebAdmin Panel repository. This administrative dashboard serves as the central control hub for managing, moderating, and curating all content, user data, and system configurations before they are published to the AngkorVerse mobile application.

## Core Objectives
- Content Curation: Review, approve, and manage historical data, 3D/AR assets, tour guides, audio descriptions, and multimedia content related to Angkor archaeological sites.
- User Management: Oversee app users, manage admin roles, monitor account status, and handle access permissions.
- Analytics & Monitoring: Track user engagement, app usage statistics, and system performance metrics in real-time.
- System Settings: Configure localized content (languages/currencies), push notifications, and API integrations.

## Frontend Technology Stack
- Framework: React.js (Single Page Application)
- Language: JavaScript (ES6+)
- Styling: Tailwind CSS (Utility-first styling, responsive design)
- Icons: Lucide React / Heroicons
- Routing: React Router v6
<!-- Not Yet -->
<!-- State Management: Context API / Redux Toolkit / React Query (TanStack Query) for server state -->
<!-- HTTP Client: Axios (with interceptors for JWT authentication) -->

## Installation and Run the Development Server
- npm install (node_modules)
- npm run dev (Run the Development Server)
- npm run build (Generate an optimized production build)

## Demo
This project utilizes a modern frontend stack powered by **Vite** and **React 19**. In total, **15 packages** (6 production dependencies and 9 development dependencies) are installed and configured:

### 📦 Installed Technologies & Libraries

#### 🎨 Core & Production Dependencies (6 packages)
- **React 19 (`react`, `react-dom`)**: Core UI library for building dynamic component-based user interfaces.
- **React Router v7 (`react-router-dom`)**: Declarative routing for single-page application (SPA) navigation.
- **Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`)**: Modern utility-first CSS framework integrated directly with Vite.
- **Lucide React (`lucide-react`)**: Clean, lightweight icon suite for UI components and admin controls.

#### 🛠️ Development & Tooling Dependencies (9 packages)
- **Vite (`vite`, `@vitejs/plugin-react`)**: Fast Next Generation frontend build tool and hot-reloading dev server.
- **ESLint & Plugins (`eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`)**: Code quality tools for code formatting, hook enforcement, and fast-refresh feedback.
- **React Type Definitions (`@types/react`, `@types/react-dom`)**: Type declarations providing autocompletion and IDE support.
