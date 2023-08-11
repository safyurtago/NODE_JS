const IO = require('../utils/io')
const Contact = require('../models/Contact.model')

const Users = new IO(process.cwd() + '/database/users.json')
const Contacts = new IO(process.cwd() + '/database/contacts.json')


const sendContact = async (req, res) => {
    const {name, phoneNumber, email, message} = req.body;
    const contacts = await Contacts.read()
    const newContact = new Contact(name, phoneNumber, email, message)
    const result = contacts.length ? [...contacts, newContact] : [newContact]
    await Contacts.write(result)
    const users = await Users.read()
    const admins = users.filter(user => user.isAdmin === true)
    const adminIds = admins.map((admin) => {return admin.id})
    res.status(201).json({message: newContact, admins: adminIds})
}

const getAllContact = async (req, res) => {
    const contacts = await Contacts.read()
    contacts.forEach((contact) => {
        contact.isSeen = true
    })
    await Contacts.write(contacts)
    res.status(200).json(contacts)
}

module.exports = {
    sendContact,
    getAllContact
};