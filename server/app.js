const express = require('express');
const app = express();
const {mongoose} = require('./Data/mongo');
const {Todo} = require("./Data/tables/todoTable");

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/',(req,res) =>{
    res.send("Testing")
})


app.post('/login',(req,res) =>{

    // Todo.find().then((task) =>{
    //     res.send(tasks)
    // })
    // res.send("Testing")
})

app.get('/getTask/:id',(req,res) =>{
    // console.log(req.params.id);
    Todo.find({userId : req.params.id}).then((task) =>{
        res.send(task)
    })
})
 
app.post('/editTask/:id',(req,res) =>{
    Todo.findOneAndUpdate({userId : req.params.id, _id: req.body.taskId },{$set:{task: req.body.task}}).then((task) =>{
        res.send(task);
    })
    // res.send("Testing")
})


app.post('/addTask/:id',(req,res) =>{
    var task = req.body.task;
    var userId = req.params.id;

    var newTask = new Todo({
        task,
        userId
    });
    newTask.save().then((task)=>{
        res.send(task);
    })

    // res.send("Testing")
})


app.post('/deleteTask/:id',(req,res) =>{
    Todo.findOneAndRemove({userId : req.params.id, _id: req.body.taskId }).then((task) =>{
        res.send(task);
    })
    // res.send("Testing")
})

app.get('/',(req,res) =>{
    res.send("Testing")
})



app.listen(3000,() =>{
    console.log("Server started")
})
