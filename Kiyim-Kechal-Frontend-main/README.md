# MAISON — Storefront (React + Vite)

A professional storefront and admin console for the FastAPI e-commerce backend.
Built with React 19, React Router and Axios.

## Features

- **Editorial design system** — custom palette, Fraunces + Inter typography, responsive layout.
- **Auth** — branded split-screen Login & Sign-up with validation, password show/hide,
  loading states, and one-tap demo credentials. JWT is restored on refresh.
- **Storefront** — hero, category filter chips, live search, sorting, loading skeletons,
  product cards with imagery, a product detail modal, and a slide-out shopping bag.
- **Product imagery** — the backend has no image field, so each product gets an elegant,
  deterministic SVG "lookbook" tile (per-category gradient + clothing silhouette). Always loads.
- **Admin console** — stat cards, a recently-added product table with thumbnails, and
  polished modals to create categories and products.
- **Toasts** for instant feedback throughout.

## Running it

The backend must be running first (see the backend README — `docker compose up --build`).

```bash
npm install
npm run dev
```

Open http://localhost:5173

> The API base URL defaults to `http://localhost:8000`. Override it by creating a
> `.env` file with `VITE_API_URL=http://your-host:8000`.

## Demo accounts

| Role     | Username | Password     |
|----------|----------|--------------|
| Customer | `user`   | `user12345`  |
| Admin    | `admin`  | `admin12345` |

## Project structure

```
src/
├── api/            Axios client + endpoint wrappers (auto-attaches JWT)
├── context/        Auth, Cart and Toast providers
├── utils/catalog   Product imagery, pricing, rating helpers
├── components/
│   ├── Navbar, Footer, Icons, Login, Signup
│   ├── customer/   CustomerPage, ProductCard, ProductGrid, ProductModal,
│   │               CategoryList, CartDrawer, Stars
│   └── admin/      AdminDashboard, AddProductModel, AddCategoryModel
└── index.css       Design system (all component styling)
```
