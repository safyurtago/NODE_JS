const ENV = require(process.cwd() + "/config/index")
const express = require("express")
const userRouter = require(process.cwd() + "/src/routes/userRouter")


const app = express()
app.use(express.json())

app.use("/user", userRouter)



app.listen(ENV.port, () => {
    console.log(`Server listening on port: ${ENV.port}`);
})