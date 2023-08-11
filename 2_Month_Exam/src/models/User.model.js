const {v4: uuid} = require('uuid');

class User {
    constructor(firstName, lastName, username, email, password ) {
        this.id = uuid();
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = false;
    }
}

module.exports = User;