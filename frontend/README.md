# Job Application Tracker - Frontend

The frontend client for the Job Application Tracker, built with React, Vite, and TailwindCSS.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Charts**: Chart.js (react-chartjs-2)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

- **Development Mode**:
  ```bash
  npm run dev
  ```
  Starts the local development server at `http://localhost:5173`.

- **Production Build**:
  ```bash
  npm run build
  ```
  Builds the application for production to the `dist` folder.

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

## ✨ Features

- **Dashboard**: Visual analytics of application status and progress.
- **Application Tracking**: Create, update, and manage job applications.
- **Responsive Design**: Fully responsive UI built with TailwindCSS.
- **Interactive UI**: Smooth animations and transitions using Framer Motion.
- **Admin Panel**: User session monitoring and management.

## 📂 Project Structure

- `src/api`: Axios setup and API calls
- `src/components`: Reusable UI components
- `src/pages`: Page components (Dashboard, Login, Admin, etc.)
- `src/store`: Redux store and slices
- `src/hooks`: Custom React hooks

## 🔧 Configuration

The frontend connects to the backend API. Ensure the backend is running and the API URL is correctly configured in your environment or `axiosInstance` setup.
