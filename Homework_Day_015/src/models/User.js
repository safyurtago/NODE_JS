class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.userGroups = new Array();
    }
}

module.exports = User;