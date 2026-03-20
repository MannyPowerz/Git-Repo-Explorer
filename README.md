# GitHub Repo Explorer

[cite_start]A fullstack TypeScript application that allows users to search for GitHub repositories by username and save their favorite repos to their account[cite: 1, 4, 5].

## 🔗 Live Demo

- **Frontend:** [https://git-repo-explorer.vercel.app](https://git-repo-explorer.vercel.app)
- **Backend:** [https://git-repo-explorer.onrender.com](https://git-repo-explorer.onrender.com)

---

## 🛠 Tech Stack

| Category          | Technology                                            |
| :---------------- | :---------------------------------------------------- |
| **Frontend**      | [cite_start]React + TypeScript [cite: 38]             |
| **Backend**       | [cite_start]Node.js + Express + TypeScript [cite: 39] |
| **Database**      | [cite_start]MongoDB or PostgreSQL [cite: 40]          |
| **Auth**          | [cite_start]JWT + bcrypt [cite: 41]                   |
| **Data Fetching** | [cite_start]React Query                               |
| **Deployment**    | [cite_start]Vercel + Render [cite: 50]                |

---

## 🚀 Features

- [cite_start]**Search GitHub Repositories:** Input a GitHub username to fetch and display public repositories[cite: 8, 9, 10, 11].
- [cite_start]**Repository Insights:** View repository name, description, star count, language, and a direct link[cite: 13, 14, 15, 16, 17, 18].
- [cite_start]**Personalized Favorites:** Securely save repositories to a user profile (requires login)[cite: 19, 21, 22].
- [cite_start]**Responsive Design:** Optimized for both mobile and desktop viewing.
- [cite_start]**Robust Error Handling:** Integrated loading states and error messages for failed searches or API issues[cite: 24, 25].

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- [cite_start]MongoDB Atlas or local database instance [cite: 40]

### 1. Clone the Repository

````bash
git clone [https://github.com/your-username/github-repo-explorer.git](https://github.com/your-username/github-repo-explorer.git)
cd github-repo-explorer

### 2. Backend Setup

cd backend
npm install
# Create a .env file with your specific variables:
# PORT=5000
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret_key
npm run dev

### 3. Frontend Setup

cd ../frontend
npm install
# Create a .env file with your API URL:
# VITE_API_URL=http://localhost:5000
npm run dev

## 📡 API Endpoints

[cite_start]The backend is built with Node.js and Express, providing a JWT-protected API for user and repository management[cite: 39, 41].

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | [cite_start]Register a new user and hash password with bcrypt [cite: 28, 30] | No |
| `POST` | `/auth/login` | [cite_start]Authenticate user and issue a JWT access token [cite: 29, 30] | No |
| `GET` | `/user/favorites` | [cite_start]Retrieve the authenticated user's saved repositories [cite: 32] | [cite_start]Yes (JWT) [cite: 36] |
| `POST` | `/user/favorites` | [cite_start]Save a new GitHub repository to the user's profile [cite: 33] | [cite_start]Yes (JWT) [cite: 36] |
| `DELETE` | `/user/favorites/:id` | [cite_start]Remove a saved repository by its unique ID [cite: 34] | [cite_start]Yes (JWT) [cite: 36] |

---

## 📂 Project Structure

[cite_start]This project follows a clear separation of concerns to ensure maintainability and reusability[cite: 44, 46].

```text
├── frontend/               # React + TypeScript client [cite: 38]
│   ├── src/
│   │   ├── components/     # Reusable UI (RepoCard, RepoList, SearchBar) [cite: 44]
│   │   ├── hooks/          # Custom logic (useAuth)
│   │   ├── services/       # API integration (repoService, authService)
│   │   └── types/          # TypeScript interfaces (IRepo, IUser)
├── backend/                # Node.js + Express + TypeScript server [cite: 39]
│   ├── src/
│   │   ├── controllers/    # Business logic for request handling
│   │   ├── middleware/     # JWT authentication and route protection [cite: 35, 36]
│   │   ├── models/         # Database schemas (PostgreSQL or MongoDB) [cite: 40]
│   │   └── routes/         # API route definitions [cite: 27, 31]


## 🧠 Tech Decisions & Tradeoffs

* [cite_start]**Strict TypeScript Implementation**: Leveraged interfaces, types, and enums across the full stack (React and Node.js) to ensure data integrity and catch errors during development[cite: 38, 39, 43].
* [cite_start]**React Query for State Management**: Opted for TanStack Query to handle server-state, caching, and automatic background refetching, significantly reducing complex `useEffect` boilerplate.
* [cite_start]**Mobile-First Responsive Design**: Prioritized a mobile-first UI architecture using CSS Grid and Flexbox to ensure a seamless and performant experience across all screen sizes[cite: 49].
* [cite_start]**JWT & Bcrypt Security**: Implemented JWT for stateless authentication and bcrypt for secure, one-way password hashing to protect user data and secure private routes[cite: 21, 30, 41].
* [cite_start]**Async/Await & Error Handling**: Utilized modern async/await patterns and centralized error handling to gracefully manage API failures and provide clear loading states to the user [cite: 23-25, 46].
````
