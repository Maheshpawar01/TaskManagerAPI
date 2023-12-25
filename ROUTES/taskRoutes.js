const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send("task Routes are working!")
})

//CRUD task
module.exports = router;