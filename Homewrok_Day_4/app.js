const http = require("http")
const bodyParser = require("./bodyParser")
const IO = require("./utils/io")
const Dos = new IO("./database/products.json")



const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.url === "/warehouse" && req.method === "GET") {
      const todos = await Dos.read();
  
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(todos));
    }
    if (req.url === "/warehouse" && req.method === "POST") {
        req.body = await bodyParser(req)
        const {name, count, price} = req.body;
        const todos = await Dos.read()
        const id = (todos[todos.length - 1]?.id || 0) + 1
        const newData = {id, name, count, price}
        const result = todos.length ? [...todos, newData] : [newData]
        await Dos.write(result)
        res.end(JSON.stringify({message: "ADDED"})) 
    }
    
});
  



server.listen(4000, "localhost", () => {
    console.log("Server Port: 4000")
})
