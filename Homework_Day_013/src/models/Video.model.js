class Video {
    constructor (id, description, user_id) {
        this.id = id;
        this.description = description;
        this.user_id = user_id;
        this.created_at = new Date()
    }
}

module.exports = Video;