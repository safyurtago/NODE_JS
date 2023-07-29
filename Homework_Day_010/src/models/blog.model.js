class Blog {
    constructor (id, title, image, description, owner) {
        this.id = id
        this.title = title
        this.image = image
        this.description = description
        this.owner = owner
        this.createdAt = Date.now()
    }
}

module.exports = Blog;