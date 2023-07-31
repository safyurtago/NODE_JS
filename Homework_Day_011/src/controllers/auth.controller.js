const IO = require("../utils/io")
const User = require("../models/User.model")
const bcrypt = require("bcrypt")
const Joi = require("joi")
const jwt = require("../utils/jwt")
const config = require("config")

const Users = new IO(process.cwd() + "/database/users.json")


const login = async (req, res) => {
    
    try {
        const {phoneNumber, password} = req.body; 
        const schema = Joi.object({
            phoneNumber: Joi.string().min(13).max(13).required(),
            password: Joi.string().min(6).required()
        })
        const {error} = schema.validate({phoneNumber, password})
        if(error) return res.status(400).json({message: error.message})
        const users = await Users.read();
        const findUser = users.find(user => user.phoneNumber === phoneNumber);
        if (!findUser) return res.status(404).json({message: "Phone Number Not Found"})

        const compare = await bcrypt.compare(password, findUser.password)
        if (!compare) return res.status(403).json({message: "Incorrect Password"})
        const token = jwt.sign({id: findUser.id})
        
        res.status(201).json({message: "Success", data: token})


    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}
const register = async (req, res) => {
    try {
        const {fullName, phoneNumber, password} = req.body; 

        const schema = Joi.object({
            fullName: Joi.string().min(8).max(32).required(),
            phoneNumber: Joi.string().min(13).max(13).required(),
            password: Joi.string().min(6).required()
        })
        const {error} = schema.validate({fullName, phoneNumber, password})
        if(error) return res.status(400).json({message: error.message})

        const users = await Users.read();
        const findUser = users.find(user => user.phoneNumber === phoneNumber);
        if (findUser) return res.status(401).json({message: "Phone Number has already exists"})
        const id = (users[users.length - 1]?.id || 0) + 1
        const newUser = new User(id, fullName, phoneNumber, await bcrypt.hash(password, 12))
        const result = users.length ? [... users, newUser] : [newUser]
        await Users.write(result)
        const token = jwt.sign({id: newUser.id})
        
        res.status(201).json({message: "Success", data: token})
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {
    login,
    register,
}