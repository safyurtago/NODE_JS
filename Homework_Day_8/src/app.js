const express = require("express")
const ENV = require(process.cwd() + "/config")
const app = express()

const userRouter = require(process.cwd() + "/src/routes/userRouter")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(process.cwd() + "/uploads"))

app.use(userRouter)

app.listen(ENV.PORT, () => {
    console.log(`Server listening on port: ${ENV.PORT}`);
})