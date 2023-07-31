class User {
    constructor(id, fullName, phoneNumber, password) {
        this.id = id
        this.fullName = fullName
        this.password = password
        this.phoneNumber = phoneNumber
        this.isAdmin = false
    }
}

module.exports = User