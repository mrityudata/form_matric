# Project Documentation: Formatric Studio

This document outlines the technical architecture, stack, and asset management for the Formatric Studio project.

---

## 1. Technical Stack

### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** 
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) for dynamic class handling.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (`motion/react`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (using [Mongoose](https://mongoosejs.com/) ODM)
- **Execution:** [tsx](https://github.com/privatenumber/tsx) for running TypeScript directly in Node.
- **Middleware:** 
  - `cors` for cross-origin requests.
  - `dotenv` for environment variable management.

---

## 2. Asset Management

The project utilizes a hybrid approach for assets, combining cloud storage, external APIs, and local files.

### Cloud Storage & External Media
- **[Cloudinary](https://cloudinary.com/):** Used as the primary host for high-quality, studio-specific video assets (e.g., hero background videos).
- **Google Cloud Storage:** Utilized for sample/demo video content hosted on Google's public buckets.
- **[Picsum Photos](https://picsum.photos/):** Leveraged for high-resolution placeholder images and mock project data.
- **Google Favicon API:** Used to dynamically fetch high-quality brand icons for the clients section.

### Local Assets
- **`public/logo.png`:** The core brand identity file.
- **Noise Overlay:** A SVG-based noise texture (`grainy-gradients.vercel.app`) applied globally for the studio's signature aesthetic.

---

## 3. Development Workflow

- **Parallel Execution:** The project uses `concurrently` to run both the Vite development server and the Express backend simultaneously using a single command:
  ```bash
  npm run start
  ```
- **Seeding:** The backend includes a `seed.ts` script to populate the MongoDB database with initial project and client data.
