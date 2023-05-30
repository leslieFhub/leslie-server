import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

// Get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(express.static(__dirname));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store"); // Disable caching for all responses
  next();
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
  next();
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
