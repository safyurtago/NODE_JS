const express = require("express")
const config = require("config")
const fileUpload = require("express-fileupload")

const routes = require("./routes")

// console.log("+998903130888".length);

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use(express.static(process.cwd() + "/uploads"))


app.use("/api", routes)


const port = config.get("port")

app.listen(port, () => {
    console.log(port);
})