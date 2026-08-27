import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { requestId, requestLogger } from "./middleware/requestContext.js";
import { authenticate } from "./middleware/authenticate.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(express.json({ limit: "100kb" })); // BEFORE any route reads req.body
app.use(requestId);
app.use(requestLogger);

app.get("/api/health", (req, res) =>
  res.json({ status: "OK", uptime: process.uptime() }),
);

app.use("/api/auth", authRoutes); // public
app.use("/api/boards", authenticate, boardRoutes); // protected
app.use("/api/tasks", authenticate, taskRoutes); // protected

app.use(notFoundHandler); // no route matched -> 404
app.use(errorHandler); // LAST, always

export default app;
