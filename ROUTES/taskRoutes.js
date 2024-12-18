const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const Task = require('../MODELS/Task')

router.get('/test', auth , (req, res)=>{
    res.json({
        message:"task Routes are working!",
        user: req.user
    })
})

//CRUD task for authenticate users
//create a task
router.post('/', auth, async (req, res)=>{
    try{
        // description, owner from req.body
        //owner : req.user._id

        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save();
        res.status(201).json({task, message: "Task created successfully"})
    }
    catch(error){
        res.status(400).send({error: err})
    }
})


//get user task
router.get('/', auth, async (req, res)=>{
    try{
        const tasks = await Task.find({
            owner: req.user._id
        })

        res.status(200).json({tasks, count: tasks.length, message: "tasks fetched successfully"})
    }
    catch(err){
        res.status(500).send({error: err})
    }
})

//fetch a task by id

router.get('/:id', auth, async(req, res)=>{
    const taskid = req.params.id
    try{
      const task = await Task.findOne({
        _id: taskid,
        owner: req.user._id
      });
      if(!task){
        return res.status(404).json({message: "task not found"});
      }
        res.status(200).json({task, message: "task fetched successfully"});
    }
    catch(err){
        res.status(500).send({error: err})
    }
})

//update a task by id - description, completed
router.patch('/:id', auth, async(req, res)=>{
    const taskid = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({error:"Invalid Updates"})

    }
    try{
      const task = await Task.findOne({
        _id: taskid,
        owner: req.user._id
      });
      if(!task){
        return res.status(404).json({message: "task not found"});
      }

      updates.forEach(update => task[update]= req.body[update]);
      await task.save()

      res.json({
        message : "Task updated successfully",
      })

    }
    catch(err){
        res.status(500).send({error: err})
    }
})

//delete a task by id

router.delete('/:id', auth, async(req, res)=>{
    const taskid = req.params.id
    try{
      const task = await Task.findOneAndDelete({
        _id: taskid,
        owner: req.user._id
      });
      if(!task){
        return res.status(404).json({message: "task not found"});
      }
        res.status(200).json({task, message: "task Deleted successfully"});
    }
    catch(err){
        res.status(500).send({error: err})
    }
})



module.exports = router;