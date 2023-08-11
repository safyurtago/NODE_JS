const {v4: uuid} = require('uuid')

class Contact {
    constructor(name, phoneNumber, email, message) {
        this.id = uuid()
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.message = message;
        this.isSeen = false
    }
}

module.exports = Contact;