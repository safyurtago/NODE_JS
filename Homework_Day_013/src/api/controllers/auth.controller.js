const Joi = require("joi");
const jwt = require("../../utils/jwt");
const bcrypt = require("bcrypt");
const {v4:uuid} = require("uuid");
const path = require("path");

const IO = require("../.././utils/io")
const Users = new IO(process.cwd() + "/database/users.json");
const User = require("../.././models/User.model");

const login = async (req, res) => {
    try {    
        const {email, password} = req.body;
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        })
        
        const {error} = schema.validate({email, password})

        if(error) return res.status(400).json({message: error.message})
        const users = await Users.read();
        const findUser = users.find(user => user.email === email);
        if (!findUser) return res.status(404).json({message: "Email Not Found"})

        const compare = await bcrypt.compare(password, findUser.password)
        if (!compare) return res.status(403).json({message: "Incorrect Password"})
        const token = jwt.sign({id: findUser.id})
        
        
        res.cookie("token", token, {maxAge: 3600*100000})
        res.status(201).json({message: "Success"})


    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

const register = async (req, res) => {
    try {
        const {fullName, email, password} = req.body; 
        const photo = req.files.photo
        const schema = Joi.object({
            fullName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        })
        const {error} = schema.validate({fullName, email, password})
        if(error) return res.status(400).json({message: error.message})

        const users = await Users.read();
        const findUser = users.find(user => user.email === email);
        if (findUser) return res.status(401).json({message: "Email has already exists"})

        const mimetype = path.extname(photo.name)
        const imageName = uuid() + mimetype
        photo.mv(process.cwd() + `/pictures/${imageName}`)
        const id = (users[users.length - 1]?.id || 0) + 1
        const newUser = new User(id, fullName, email, imageName, await bcrypt.hash(password, 12))
        const result = users.length ? [... users, newUser] : [newUser]

        await Users.write(result)
        const token = jwt.sign({id: newUser.id})

        res.cookie("token", token, {maxAge: 3600*1000})
        res.status(201).json({message: "Success"})



    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    login,
    register
}