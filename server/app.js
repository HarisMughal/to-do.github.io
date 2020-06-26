const express = require('express');
const app = express();
const {mongoose} = require('./Data/mongo');
const {Todo} = require("./Data/tables/todoTable");
const {User} = require("./Data/tables/userTable");

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.get('/',(req,res) =>{
    res.send("Testing")
})

app.post('/newUser',(req,res) =>{
    let email = req.body.email;
    let password = req.body.password
    let id  = req.body.id
    var newUser = new User({
        email,
        password,
        id
    });
    newUser.save().then((user)=>{
        res.send(user);
    })
    // Todo.find().then((task) =>{
    //     res.send(tasks)
    // })
    // res.send("Testing")
})


app.post('/login',(req,res) =>{
    // console.log(req.params);
    User.find({email : req.body.email, password:req.body.password }).then((data) =>{
        res.status(200).json(data);
    })
    // Todo.find().then((task) =>{
    //     res.send(tasks)
    // })
    // res.send("Testing")
})

app.get('/getTask/:id',(req,res) =>{
    // console.log(req.params.id);
    Todo.find({userId : req.params.id}).then((task) =>{
        res.status(200).json(task);
    })
})
 
app.post('/editTask/:id',(req,res) =>{
    Todo.findOneAndUpdate({userId : req.params.id, _id: req.body.taskId },{$set:{task: req.body.task,complete: req.body.complete}}).then((task) =>{
        res.send(task);
    })
    // res.send("Testing")
})


app.post('/addTask/:id',(req,res) =>{
    var task = req.body.task;
    var userId = req.params.id;
    var complete = false
    var newTask = new Todo({
        task,
        userId,
        complete
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
