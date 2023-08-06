class Group {
    constructor(id, name, author)  {
        this.id = id;
        this.author = author;
        this.groupUsers = new Array();
        this.name = name;
    }
}

module.exports = Group;