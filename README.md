# GitHub Repo Explorer

A fullstack TypeScript application that allows users to search for GitHub repositories by username and save their favorite repos to their account.

## 🔗 Live Demo

* **Frontend:** [https://git-repo-explorer.vercel.app](https://git-repo-explorer.vercel.app)
* **Backend:** [https://git-repo-explorer.onrender.com](https://git-repo-explorer.onrender.com)

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React + TypeScript |
| **Backend** | Node.js + Express + TypeScript |
| **Database** | MongoDB (Mongoose) |
| **Auth** | JWT + bcrypt |
| **Data Fetching** | TanStack Query (React Query) |
| **Deployment** | Vercel + Render |

---

## 🚀 Features

* **Search GitHub Repositories:** Input a GitHub username to fetch and display public repositories via the GitHub REST API.
* **Repository Info:** Displays name, description, star count, language, and direct links for each repository.
* **Secure Favorites:** Allows authenticated users to save repositories to their profile.
* **User Authentication:** Secure registration and login using JWT and password hashing.
* **Responsive Design:** Mobile-first UI optimized for seamless use on all devices.
* **Error Handling:** Robust loading states and clear error feedback for API failures or missing users.

---

## 🚦 Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone https://github.com/MannyPowerz/Git-Repo-Explorer.git
cd Git-Repo-Explorer
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Then start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Create a `.env` file in the frontend directory with the following variable:
```env
VITE_API_URL=http://localhost:8000/api
```

## 📡 API Endpoints

The backend API is prefixed with `/api` and utilizes JWT for protecting user-specific data.

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user and hash password with bcrypt | No |
| `POST` | `/api/auth/login` | Authenticate user and issue a JWT access token | No |
| `GET` | `/api/user/favorites` | Retrieve the authenticated user's saved repositories | Yes (JWT) |
| `POST` | `/api/user/favorites` | Save a new GitHub repository to the user's profile | Yes (JWT) |
| `DELETE` | `/api/user/favorites/:id` | Remove a saved repository by its unique ID | Yes (JWT) |

---

## 📂 Project Structure

This project is organized to maintain a strict separation of concerns between the client and the server.

```text
├── frontend/               # React + TypeScript client
│   ├── src/
│   │   ├── components/     # Reusable UI (RepoCard, RepoList, SearchBar)
│   │   ├── hooks/          # Custom logic and state (useAuth)
│   │   ├── services/       # API integration (repoService, authService)
│   │   └── types/          # TypeScript interfaces (IRepo, IUser)
├── backend/                # Node.js + Express + TypeScript server
│   ├── src/
│   │   ├── controllers/    # Business logic for request handling
│   │   ├── middleware/     # JWT authentication and route protection
│   │   ├── models/         # MongoDB (Mongoose) schemas
│   │   └── routes/         # API route definitions (prefixed with /api)

## 🧠 Tech Decisions & Tradeoffs

- **Strict TypeScript Implementation**: Leveraged interfaces, types, and enums across the full stack (React and Node.js) to ensure data integrity and catch potential bugs during development.
- **React Query for State Management**: Opted for TanStack Query over standard `useEffect` hooks to handle server-state, caching, and automatic background refetching, effectively reducing boilerplate code.
- **Mobile-First Responsive Design**: Prioritized a mobile-first UI architecture using CSS Grid and Flexbox to ensure a seamless experience across all device sizes
- **JWT & Bcrypt Security**: Implemented stateless authentication using JWT and secure, one-way password hashing with bcrypt to protect user credentials and private routes.
- **Async/Await & Error Handling**: Utilized modern asynchronous patterns and centralized error handling to manage API failures and provide clear loading feedback to the user.