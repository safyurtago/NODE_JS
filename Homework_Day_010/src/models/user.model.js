class User {
    constructor (id, fullName, username, password, photo = null) {
        this.id = id
        this.fullName = fullName
        this.username = username
        this.password = password
        this.photo = photo
    }
}

module.exports = User;