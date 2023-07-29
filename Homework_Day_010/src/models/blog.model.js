class Blog {
    constructor (id, title, description, photo, owner) {
        this.id = id
        this.title = title
        this.photo = photo
        this.description = description
        this.owner = owner
        this.views = 0
        this.createdAt = Date.now()
    }
}

module.exports = Blog;