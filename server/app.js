const express = require("express")
const {connectToDb,getDb} = require("./db")
const {ObjectId} = require("mongodb")
const app = express()

app.use(express.json())
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// database connection
let db
connectToDb((err)=>{
    console.log("in app.js")
    if(!err){
        app.listen(8383,()=>{
            console.log("app listening on port number 8383")
        })
        db = getDb()
    }
})


// routes

//RETRIEVE: get request > get all tasks present in database and show in Ui when opening the page
app.get("/api/Alltasks",(requestObject,responseObject)=>{
    let displayTodos=[]

    db.collection("RohithTodo")
      .find()
      .forEach(eachTodoDocument=>displayTodos.push(eachTodoDocument))
      .then(()=>{
        responseObject.status(200)
        responseObject.send(displayTodos)
      })
      .catch((err)=>{
        responseObject.status(500) // client error
        responseObject.send("Cannot fetch todo documents",err)
      })
})


//CREATE: post request > create new todo document
app.post("/api/tasks",(requestObject,responseObject)=>{
    const newTodo = requestObject.body
    db.collection("RohithTodo")
      .insertOne(newTodo)
      .then((result)=>{
        responseObject.status(200)
        responseObject.send(result)
      })
      .catch((err)=>{
        responseObject.status(500)
        responseObject.send("failed tp create todo document",err)
      })  
})


// PATCH request
app.put("/api/tasks/update/:id",(requestObject,responseObject)=>{
    
    const { completed } = requestObject.body;
    const update = {
        "completed":completed
    }
    if(ObjectId.isValid(requestObject.params.id)){
        db.collection("RohithTodo")
          .updateOne({_id: new ObjectId(requestObject.params.id)},{$set:update})
          .then(result=>{
            responseObject.status(200)
            responseObject.send(result)
          })
          .catch((err)=>{
            responseObject.status(500)
            responseObject.send("cannot update",err)
          })
    }
})


// delete request
app.delete("/api/tasks/delete/:id",(requestObject,responseObject)=>{
    if(ObjectId.isValid(requestObject.params.id)){
        db.collection("RohithTodo")
          .deleteOne({_id: new ObjectId(requestObject.params.id)})
          .then(result=>{
            responseObject.status(200)
            responseObject.send(result)
          })
          .catch((err)=>{
            responseObject.status(500)
            responseObject.send("invalid")
          })
      }  
      else{
        responseObject.status(500)
        responseObject.send("invalid id format")
      }
})
