# My ReactServe App

A backend API built with [ReactServe](https://github.com/your-username/react-serve-js) - a React-style framework for building APIs with JSX.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Your API will be running at http://localhost:6969

## Available Endpoints

- `GET /` - Welcome message
- `GET /users` - List all users
- `GET /users?q=query` - Find all users that include query in their names
- `GET /users/:id` - Get user by ID
- `GET /posts` - List all posts
- `GET /posts?q=query` - Find all posts that include query in their names
- `GET /posts/:id` - Get post by ID

## Project Structure

```
src/
  index.tsx    # Main application file
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run debug` - Start development server with hot reload with --inspect=9229: This flag enables the Node.js debugger and binds it to port 9229. The debugger allows you to attach a debugging tool (e.g., Chrome DevTools or Visual Studio Code) to inspect and step through your code. This is particularly useful for identifying and fixing runtime issues in your application.
- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## Learn More

- [ReactServe Documentation](https://github.com/your-username/react-serve-js)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
