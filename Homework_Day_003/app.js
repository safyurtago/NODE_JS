const http = require("http")
const bodyParser = require("./utils/bodyParser")
const IO = require("./utils/io")
const Users = new IO("./database/users.json")
const  Person = require("./models/User.js")





const server = http.createServer(async (request, resolve) => {
    if (request.url == "/auth/login" && request.method == "POST") {
        request.body = await bodyParser(request)
        const {username, password} = request.body

        const users = await Users.read()
        const findUser = users.find((user) => user.username === username)
        if (!findUser) {
            resolve.writeHead(403, {"Content-type": "application/json"})
            return resolve.end(JSON.stringify({message: "Username does not exist"}))
        }
        const findUserPass = users.find((user) => user.username === username && user.password === password)
        if (!findUserPass) {
            resolve.writeHead(403, {"Content-type": "application/json"})
            return resolve.end(JSON.stringify({message: "Password is wrong"}))
        }
        resolve.writeHead(403, {"Content-type": "application/json"})
        return resolve.end(JSON.stringify({message: "Successfully Logged in"}))

    } else if (request.url == "/auth/register" && request.method == "POST") {
        request.body = await bodyParser(request)
        const {username, password} = request.body

        const users =  await Users.read()
        
        const findUser = users.find((user) => user.username === username)
        if (findUser) {
            resolve.writeHead(403,  {"Content-type": "application/json"})
            return resolve.end(JSON.stringify({message: "Username already exists"}))
        }
        
        const id = (users[users.length - 1]?.id || 0)+ 1
        const person = new Person(id, username, password)
        const result = users.length ? [... users, person] : [person]
        
        await Users.write(result)
        resolve.writeHead(201, {"Content-type": "application/json"})
        resolve.end(JSON.stringify({message: "Success"}))
    }
})

server.listen(4000, "localhost", () => {
    console.log("Server listening on port: 4000");
})