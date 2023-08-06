class User {
    constructor (id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.userGroups = new Array();
    }
}

module.exports = User;