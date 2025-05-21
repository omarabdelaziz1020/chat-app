# Modern React Chat Application

A responsive, feature-rich chat application built with React, TypeScript, and Vite.

## Features

- **User Authentication**: Login/logout functionality with token storage
- **Chat List**: Multi-select for users to create individual or broadcast chats
- **Individual & Broadcast Chats**: Send messages to single users or groups
- **Chatbot**: Built-in chatbot with canned responses
- **Media Support**: Upload and share images in conversations
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Works across all device sizes
- **Message History**: View conversation history with proper scrolling

## Project Structure

This project follows a clean, modular architecture for better maintainability and developer experience. See [STRUCTURE.md](./STRUCTURE.md) for detailed documentation of the project organization.

Key aspects:

- Component-based architecture with clear separation of concerns
- Custom hooks for reusable logic
- Context API for global state management
- TypeScript for type safety
- SCSS modules for component styling
- Responsive design principles

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Organization

```
src/
├── api/               # API communication
├── components/        # Reusable UI components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── styles/            # SCSS styles
└── types/             # TypeScript type definitions
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
