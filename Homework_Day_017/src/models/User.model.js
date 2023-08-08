const {v4: uuid} = require('uuid');

class User {
    constructor(firstName, telegramId) {
        this.id = uuid()
        this.firstName = firstName;
        this.telegramId = telegramId;
        this.status = true;
    }
}

module.exports = User;