const express = require('express')
const app = express()
const port = 3000;
const fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser')


myfileOperations=require("./main.js");


let todoAsHtml ='';
let todosTitle=[];
let todoIds=[];

const file = fs.readFileSync("./todos.json",{encoding:"utf-8"});

const TodosData=JSON.parse(file || "[]");
TodosData.map((todo)=>{
  todosTitle.push(todo.title);
})

todoAsHtml="<body style='background-color:gray;'><div style='padding-top:50px;text-align:center;background-color:darkred;width:300px;height:500px;margin:50px auto'>";

for(let i=0; i<todosTitle.length;i++){
  todoAsHtml  += `<h3 style="color:white;"> todo ${i+1} is ${todosTitle[i]}</h3>`
}
 

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get(["/","/todos"],(req,res)=>{
  // fs.readFile('./todos.json',{encoding:"utf-8"},(err,data)=>{
  //   const Dataparse = JSON.parse(data||"[]");
  //   res.send(Dataparse);
  // })
  res.statusCode=200;
  res.end(todoAsHtml);
})

app.post("/todos", (req, res) => {
  //code logic for add to todo
  const [todo] = req.body;
  myfileOperations.addTodo("./todos.json", todo);
  return res.status(200).send("todo created successfully");
});

app.delete('/todos/:id', function(req, res) {
  if(todo.deleteTask(req.params.id)){
    res.status(200).send("todo deleted successfully");
  }else{
    res.sendStatus(400).send("id not found");
  }
});

app.patch('/todos/:id', function (req, res) {
  const id = req.params.id;
  const [obj] = req.body;
  if(todo.editToDo(id,obj)){
      res.status(200).send("todo updated successfully"); 
  }else{
      res.sendStatus(400).send("id not found");
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})