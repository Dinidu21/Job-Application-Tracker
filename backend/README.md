# Job Application Tracker - Backend

The backend service for the Job Application Tracker application, built with Node.js, Express, and MongoDB.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Passport.js (Local + Google OAuth 2.0)
- **Language**: TypeScript
- **Utilities**: PDFKit (PDF generation), UA-Parser-JS (User Agent parsing)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB installed locally or a MongoDB Atlas URI

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and configure your variables:
   ```bash
   cp .env.example .env
   ```

   **Required Variables:**
   ```ini
   MONGODB_URI=mongodb://localhost:27017/job-tracker
   JWT_SECRET=your_jwt_secret
   SESSION_SECRET=your_session_secret
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   ```

### Running the Application

- **Development Mode**:
  ```bash
  npm run dev
  ```
  Runs the server with hot-reload using `ts-node-dev`.

- **Production Build**:
  ```bash
  npm run build
  npm start
  ```

## 📂 Project Structure

- `src/config`: Database and Passport configuration
- `src/controllers`: Request handlers
- `src/middleware`: Authentication and error handling middleware
- `src/models`: Mongoose schemas
- `src/routes`: API routes
- `src/utils`: Helper functions (token generation, etc.)

## 🔒 Security Features

- JWT-based authentication
- Secure HTTP-only cookies
- Password hashing with bcrypt
- User Agent parsing for session monitoring
