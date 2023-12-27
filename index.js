const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const taskRoutes = require('./ROUTES/taskRoutes');
const userRoutes = require('./ROUTES/userRoutes');
require('dotenv').config();
const PORT = 8000;
require('./db')

app.use(bodyParser.json());
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

app.get('/', (req, res)=>{
    res.json({
        message: 'Task Manager Api is working'
    })
})


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})



