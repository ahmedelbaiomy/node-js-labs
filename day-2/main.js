const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
const path ="./todos.json";



function readFile(path,encoding="utf-8"){
  const myFile=fs.readFileSync(path,{encoding});
  todos = JSON.parse(myFile || "[]");
 return todos;
}


const server = http.createServer((req, res) => {
  switch(req.url){
    case "/":
    case "/home":
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        let home = fs.readFileSync("./pages/home.html");
        res.end(home);
        break;
    case "/todo":
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          let todos=readFile(path);
          res.end(JSON.stringify(todos));
          break;
    case "/nature":
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            let nature = fs.readFileSync("./pages/nature.html");
            res.end(nature);
            break;
            case "/qoutes":
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/html");
              let qoutes = fs.readFileSync("./pages/qoutes.html");
              res.end(qoutes);
              break;
    default:
      if(req.url.includes(".jpg")){
        res.statusCode = 200;
            let img = fs.readFileSync("." + req.url);
            res.end(img);
      }else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<center> <h3>404 <br> Page Not Found </h3></center>");
      break;
      }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})