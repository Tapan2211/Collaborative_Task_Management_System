const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

//Routes
// const userRoute = require('./routes/user.route');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Middleware
app.use(express.json());

//Routes
// app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/tasks', taskRoutes);

//listen port 
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Server is Running on ${process.env.NODE_MODE} Mode on port :${process.env.PORT}`);
})