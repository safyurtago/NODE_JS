class User {
    constructor(id, fullName, email, photo, password) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.photo = photo;
    }
}

module.exports = User;