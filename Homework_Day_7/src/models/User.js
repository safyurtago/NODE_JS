class User {
    constructor (id, fullName, phoneNumber, username, bio, photo) {
        this.id = id
        this.fullName = fullName
        this.phoneNumber = phoneNumber
        this.username = username
        this.bio = bio
        this.photo = photo
        this.createdAt = new Date()
    }
}

module.exports = User;