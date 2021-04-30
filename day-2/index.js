const fs =require('fs');

const args = process.argv;

const [,_,action,todo]= args;

let todos=[];

const path ="./todos.json";
let id=0;

const { program } = require('commander');
program.version('0.0.1');

function readFile(filepath,encoding="utf-8"){
    const myFile=fs.readFileSync(filepath,{encoding});
   return myFile;
}

function writeFile(filepath,data){
    fs.writeFileSync(filepath,JSON.stringify(data));
}

function addToDo(filepath,todo){
    myFile = readFile(filepath)
    todos=JSON.parse(myFile || "[]");
    todos.push(todo);
    writeFile(filepath,todos);
}

function List(){
    const Todo= readFile(path);  
    console.log(Todo);  
}

function edit(id,title){
    myFile = readFile(path);
    todos=JSON.parse(myFile || "[]");
    let data = todos.find(data => data.id == id);
    if(data){
        data.title = title;
    }else{
        console.log("id Not Found");
    }
   writeFile(path,todos);
}

function Delete(id){
    myFile = readFile(path);
    todos=JSON.parse(myFile || "[]");
    let data = todos.find(data => data.id == id);
    if(data){
        todos=todos.filter((val)=>{
            return val!==data	
        });
        writeFile(path,todos);
        return true;
    }return false;  
}

switch(action){
    case "add":
        myFile = readFile(path);
        todos=JSON.parse(myFile || "[]");
        if(todos.length==0){
            id=0;
        }else{
            id=todos[todos.length-1].id;
        }
        program.requiredOption('-t, --title');
        program.parse(process.argv);

        // const title = program.opts();
        let data={
            id:id+1,
            title:process.argv[4]
        }
        addToDo(path,data);
        console.log("Done");
        break;

    case "list":
      List();  
      break;

    case "edit":
        program.requiredOption('-t, --title');
        program.requiredOption('-i, --id');
        program.parse(process.argv);  
        let titletoDo =process.argv[4]; 
        let idtoDo =process.argv[6]; 

        edit(idtoDo,titletoDo);
        break;

    case "delete":
       let Id =process.argv[3]; 
       if(Delete(Id)){
        console.log("Deleted");
       }else{
        console.log("Not found") ;
       }
       break;

    default:
        break;    
}