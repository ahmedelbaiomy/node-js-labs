const fs = require("fs"); 
//readFileSync
const readFile = (filePath, encoding = "utf-8") => {
    let data = fs.readFileSync(filePath, { encoding });
    return data;
}
//writeFileSync
function writeFile(filePath, data){
    fs.writeFileSync(filePath, JSON.stringify(data))
}

function addTodo(path, todo){
    const myFile = readFile(path);
    todos = JSON.parse(myFile || "[]");
    let id = todos.length == 0 ? 0 : todos[todos.length-1].id;
    todo.id=id+1;
    todos.push(todo);
    writeFile(path, todos)
}
function editToDo(id,todo){
    file = readFile(path);
    todos=JSON.parse(file || "[]");
    let obj = todos.find(obj => obj.id == id);
    const {title,username,status}=todo;
    if(obj){
       if(title) obj.title=title;
       if(username) obj.username=username;
       if(status) obj.status=status;
       writeFile(path,todos);
       return true;
    }return false;
}
function deleteTask(path, id){
    let todos = readFile(path);
     todos = JSON.parse(todos || "[]");

     if(todos.length > 0){
            //data execlude item

             let data = todos.filter(function(item){
                return item.id != id;
             })
                writeFile(path, data)
	}else{
		console.log("No Tasks for delete .. !");
	}
}
module.exports={
    addTodo,
    editToDo,
    deleteTask
}