import cors from "cors";
import express from "express";
import routes from "./routes/index.routes";
import AppDataSource from "./config/ormConfig";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
// Import and use routes
app.use("/api", routes);

AppDataSource.initialize().then(async () => {
  // Start the server
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
