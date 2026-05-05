# FormMatricStudio

A minimalist, high-end design studio website. Built with a modern full-stack architecture, featuring dynamic media handling, sleek dark-themed interface.

## 🚀 Features

- **Minimalist Aesthetic**: Clean typography and high-density layouts focused on visual impact.
- **Dynamic Media**: Support for mixed aspect ratio images and videos with hover interactions.
- **Full-Stack Architecture**: React frontend with an Express/Node.js backend.
- **Responsive Design**: Premium look and feel across all device sizes.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Server**: Node.js + Express
- **Database**: MongoDB 
- **Runtime**: TypeScript

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)

### Installation

1.  **Install dependencies**:
    ```bash
    npm install
    cd server && npm install
    cd ..
    ```

2.  **Environment Setup**:
    - Create a `.env` file in the root and `server` directories based on the provided `.env.example` files.
    - Add your `MONGODB_URI`.

3.  **Run the application**:
    ```bash
    npm start
    ```
    This will concurrently run both the Vite development server and the Express backend.

## 📜 Available Scripts

- `npm start`: Runs both frontend and backend concurrently.
- `npm run dev`: Runs the Vite frontend only.
- `npm run server`: Runs the Express backend only.
- `npm run build`: Builds the production-ready frontend bundle.

