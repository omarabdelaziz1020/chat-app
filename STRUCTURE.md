# React Chat App - Project Structure

This project follows a modular, well-organized structure to ensure maintainability, scalability, and separation of concerns.

## Directory Structure

```
src/
├── api/               # API and backend communication
│   └── useMockApi.ts  # Mock API implementation
├── assets/            # Static assets like images, fonts
├── components/        # Reusable UI components
│   ├── chat/          # Chat-specific components
│   ├── common/        # Shared/generic components
│   └── layout/        # Layout components (Header, Footer, etc.)
├── context/           # React context providers
│   ├── index.ts       # Export all contexts
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── hooks/             # Custom React hooks
│   ├── index.ts       # Export all hooks
│   └── useMessaging.ts
├── pages/             # Page components (routes)
│   ├── BroadcastPage.tsx
│   ├── ChatListPage.tsx
│   ├── ChatPage.tsx
│   └── LoginPage.tsx
├── styles/            # SCSS styles
│   ├── _normalize.scss
│   ├── App.scss       # Main styles
│   ├── components/    # Component-specific styles
│   ├── pages/         # Page-specific styles
│   └── themes/        # Theme styles
├── types/             # TypeScript type definitions
│   ├── index.ts       # Export all types
│   ├── auth.ts
│   ├── chat.ts
│   └── theme.ts
├── utils/             # Utility functions and helpers
├── App.tsx            # Main App component
└── main.tsx           # Entry point
```

## Key Design Patterns

### 1. Modular Components

Components are organized by functionality and reusability:

- `components/chat` - Chat-specific components
- `components/layout` - Layout-related components

### 2. Custom Hooks

Custom hooks encapsulate complex logic:

- `useMessaging` - Handles chat messages, auto-scrolling, file uploads

### 3. Context API

React Context API is used for global state management:

- `AuthContext` - Authentication state and operations
- `ThemeContext` - Theme preferences (light/dark)

### 4. Type-Safe Development

Types are explicitly defined for better developer experience:

- Types for messages, users, auth, etc.
- Component props are strongly typed

### 5. SCSS Organization

SCSS files are organized by:

- Component-specific styles in `/styles/components`
- Page-specific styles in `/styles/pages`
- Theme variants in `/styles/themes`

## Styling Approach

- Uses SCSS for enhanced styling capabilities
- Responsive design with media queries
- Theme support with light/dark modes
- Component-scoped styles to avoid conflicts

## Best Practices

- Components follow the Single Responsibility Principle
- Shared logic is extracted into custom hooks
- Props are explicitly typed with TypeScript
- Consistent naming conventions throughout the codebase
