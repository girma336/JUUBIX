const express = require('express');
const colors = require('colors')
const {connectDb} = require('./config/db')
const { errorHandler } = require('./middelware/errorMiddelware')
const dotenv = require("dotenv").config()
const port =  process.env.PORT || 5000;

const app = express();


connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/tasks', require('./routes/taskRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));