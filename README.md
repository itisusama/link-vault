# LinkSaver - MERN Stack Link Manager

This is a full-stack application for managing your important links.

## Project Structure

- `/src`: React frontend (Vite + Tailwind CSS)
- `/server`: Node.js/Express backend with MongoDB models

## Features

- Add links with Name, URL, and optional Description
- Delete links
- Clean, responsive UI with Tailwind CSS
- Automatic fallback to LocalStorage if backend is not available (useful for demo/preview)

## Backend Setup

1. Go to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install express mongoose cors dotenv
   ```
3. Create a `.env` file based on `.env.example` and add your MongoDB connection string.
4. Start the server:
   ```bash
   node index.js
   ```

## Frontend Setup

1. From the root directory:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

- `GET /api/links`: Fetch all links
- `POST /api/links`: Create a new link
- `DELETE /api/links/:id`: Delete a link
