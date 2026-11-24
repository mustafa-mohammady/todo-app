import cors from "cors";
import express from "express";

import { errorHandler, notFound } from "./middleware/errors";
import { todosRouter } from "./routes/todos";

export const app = express();

try {
  process.loadEnvFile();
} catch {
  // No .env file: fine, the variables may come from the environment.
}
// The React app runs on another origin, so the browser needs CORS headers.
// Allowed: the deployed frontend (FRONTEND_URL) and the local Vite dev server.
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"].filter(
  (origin): origin is string => Boolean(origin),
);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api", todosRouter);

// Always last: the 404 handler, then the error handler.
app.use(notFound);
app.use(errorHandler);
