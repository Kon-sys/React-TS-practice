# Testing Dashboard

Testing Dashboard is a React + TypeScript single page application for tracking medication testing processes.

The project was created as a practical task focused on React, TypeScript, Vite, TanStack Router, TanStack Query, UI libraries, API integration, routing, charts, authentication, responsive layout and an extra WebSocket chat module.

## Deploy

GitHub Pages:

https://kon-sys.github.io/React-TS-practice/

## Main Features

- User registration
- User login
- Protected routes
- Logout flow
- Dashboard with analytics cards and charts
- Medication development table
- Testing process details page
- Documentation page
- Work chat with WebSocket connection
- Persistent chat history with localStorage
- Responsive layout for desktop and mobile
- API data loading with TanStack Query
- GitHub Pages deployment
- Lighthouse report

## Pages

| Route | Description |
|---|---|
| `/#/login` | Login page |
| `/#/register` | Registration page |
| `/#/` | Main dashboard |
| `/#/tables` | Medication development table |
| `/#/process` | Testing process details |
| `/#/documentation` | Documentation page |
| `/#/chat` | Work chat |

## Tech Stack

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Recharts
- DummyJSON API
- WebSocket
- OpenStreetMap iframe
- GitHub Actions
- GitHub Pages

## API

The project uses DummyJSON API for loading data.

Dashboard and Tables pages receive data through a typed API layer and TanStack Query.

The Process page uses mocked medical testing data because DummyJSON does not provide clinical testing entities.

## Authentication

Authentication is implemented on the frontend with `localStorage`.

A user can:

1. Register on `/#/register`
2. Get redirected to the dashboard
3. Logout
4. Login again with the same email and password

Registered users are stored locally in the browser.

> This is a frontend-only authentication flow because the project does not include a backend.

## Work Chat

The project includes a Work Chat page.

Chat features:

- WebSocket connection
- Message sending
- Persistent chat history
- Messages are saved in `localStorage`
- Messages remain visible after logout and login
- Different registered users can see previous messages and add new ones

## Lighthouse

A Lighthouse report was generated for the project.

Report file:

```txt
reports/lighthouse-report.html
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Kon-sys/React-TS-practice.git
cd React-TS-practice
```

Install dependencies:

```bash
npm install
```

## Development

Run the project locally:

```bash
npm run dev
```

Local development URL:

```txt
http://localhost:5173
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Preview URL:

```txt
http://localhost:4173
```

## GitHub Pages Deployment

The project is deployed through GitHub Actions.

Deployment workflow:

```txt
.github/workflows/deploy.yml
```

The project uses a relative Vite base path for GitHub Pages assets:

```ts
base: './'
```

TanStack Router uses hash history so that routes work correctly on GitHub Pages.

Example deployed routes:

```txt
https://kon-sys.github.io/React-TS-practice/#/login
https://kon-sys.github.io/React-TS-practice/#/register
https://kon-sys.github.io/React-TS-practice/#/tables
https://kon-sys.github.io/React-TS-practice/#/chat
```

## Project Structure

```txt
src/
├── app/
│   ├── providers.tsx
│   └── router.tsx
├── components/
│   └── ui/
├── entities/
│   └── testing/
├── features/
│   └── auth/
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── register.tsx
│   ├── tables.tsx
│   ├── process.tsx
│   ├── documentation.tsx
│   └── chat.tsx
├── shared/
│   └── api/
└── widgets/
    └── layout/
```

## How to Check the Project

1. Open the deploy link.
2. Go to `/#/register`.
3. Create a new account.
4. Check that the app redirects to the dashboard.
5. Open `/#/tables` and check loaded data.
6. Open `/#/process`.
7. Open `/#/documentation`.
8. Open `/#/chat`.
9. Send a chat message.
10. Logout.
11. Login again or register another user.
12. Check that previous chat messages are still visible.
