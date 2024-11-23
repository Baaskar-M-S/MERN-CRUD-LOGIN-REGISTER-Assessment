import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import userRoute from './routes/userRoutes.js'
import blogroute from "./routes/BlogRoutes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.send('Backend is running with ES6 imports...');
});

app.use("/user",userRoute)
app.use("/blog",blogroute)



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
