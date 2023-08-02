const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const routes = require("../api/routes/index");

const modules = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(fileUpload());
  app.use(cookieParser());
  app.use(express.static(process.cwd() + "/uploads"));

  app.set("view engine", "ejs");
  app.set("views", process.cwd() + "/src/views");
   

  app.use("/api", routes);

};

module.exports = modules;
