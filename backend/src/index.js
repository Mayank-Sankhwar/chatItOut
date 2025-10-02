import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import { app, server } from './lib/socket.js';
import path from 'path';
import { connectDB } from './lib/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));


const originalUse = app.use.bind(app);
app.use = (path, ...handlers) => {
    console.log("Mounting route (use):", path);
    return originalUse(path, ...handlers);
};

const originalGet = app.get.bind(app);
app.get = (path, ...handlers) => {
    console.log("Mounting route (get):", path);
    return originalGet(path, ...handlers);
};


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../frontend/dist");
    console.log("Serving frontend from:", frontendPath);

    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        console.log("Serving index.html for path:", req.originalUrl);
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}


server.listen(PORT, () => {
    console.log('Server is running on port', PORT);
    connectDB().then(() => console.log("Database connected"));
});
