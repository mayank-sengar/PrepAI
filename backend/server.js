import express from "express"
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correct absolute path to .env file in backend folder
dotenv.config({ path: path.resolve(__dirname, "./.env") });
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import questionRoutes from "./routes/questionRoutes.js"
import {generateInterviewQuestions,generateConceptExplanation} from './controllers/aiControllers.js';
import { verifyJWT } from "./middlewares/authMiddleware.js";
const app=express();
app.use(cors({
    origin:"*",
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-Type", "Authorization"],
}));

//express.json() parses that JSON and attaches it to req.body
app.use(express.json());

// Connect to MongoDB before starting the server
connectDB();

//Routes
app.use("/api/auth", authRoutes);
app.use('/api/sessions',sessionRoutes);
app.use('/api/questions',questionRoutes);
app.post("/api/ai/generate-questions", verifyJWT, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", verifyJWT, generateConceptExplanation);

//start server
const PORT= process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




