import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from '../api/routes/user.route.js'
import authRoutes from '../api/routes/auth.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log('MongoDB is connected');
}).catch((error) => {
    console.log(error);
})

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is listening on port 3000!!!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    console.log("middleware==>", err.statusCode, err.message)
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
}) 