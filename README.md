# Inventory Management Dashboard (Next.js)

A web dashboard for managing shop inventory: stock items, suppliers, usage and reports. It's a front-end prototype that runs on in-memory sample data managed through React Context.

## Features

- **Dashboard:** summary cards and a recent-activity feed
- **Inventory table:** sorting and filtering (TanStack Table), add and edit forms with validation, and quick stock deduction
- **Suppliers:** list and add suppliers
- **Reports and settings pages**
- **Responsive layout:** sidebar on desktop, slide-out navigation on mobile

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · shadcn/ui · TanStack Table · React Hook Form · Zod · date-fns · lucide-react

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
src/app/          pages: dashboard, inventory, suppliers, reports, settings
src/components/   dashboard cards, inventory table and forms, navigation, ui primitives
src/context/      in-memory store (React Context)
src/types/        TypeScript types for items, suppliers, orders and usage logs
```

## Next steps

- Connect to a real backend and database so data persists between sessions
