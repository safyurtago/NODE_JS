const {v4: uuid} = require('uuid');

class User {
    constructor(firstName, lastName, username, password, photo, age) {
        this.id = uuid()
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.photo = photo;
        this.age = age;
    }
}

module.exports = User;