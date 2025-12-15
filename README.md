# Synapse Calyx

A full-stack inquiry and capabilities platform built with the MERN stack.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Local)

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017 (Optional but recommended)

### Installation

1.  **Install Frontend Dependencies**:
    ```bash
    npm install
    ```

2.  **Install Backend Dependencies**:
    ```bash
    cd server
    npm install
    cd ..
    ```

### Running the Application

To run both the Frontend and Backend simultaneously:

```bash
npm run dev:full
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## Features
- **Project Inquiry Form**: Submits detailed project requests to the backend API.
- **Maintenance Mode**: Admin can toggle "System Offline" screen via environment variables.
- **API Status**: Frontend automatically checks system health.

## Configuration
Inside `server/.env`:
- `MAINTENANCE_MODE=true` to enable the maintenance overlay.
- `MONGO_URI` to configure the database.
