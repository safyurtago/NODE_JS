const express = require("express")
const config = require("config")
const fileUpload = require("express-fileUpload")
const cookieParser = require("cookie-parser")

const routes = require(process.cwd() + "/src/routes")

const app = express()

app.set('view engine', 'ejs');
app.set("views", process.cwd() + '/src/views');



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(process.cwd() + "/uploads"));
app.use(fileUpload());
app.use(cookieParser())



app.use("/api", routes)



app.listen(config.get("port"), () => console.log('listening on port ' + config.get("port")))