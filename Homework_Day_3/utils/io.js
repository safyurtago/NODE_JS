const fs = require("fs").promises

class IO {
    constructor(dir_name) {
        this.dir_name = dir_name
    }
    
    async read () {
        const data = await fs.readFile(this.dir_name, "utf-8")
        return data.length ? JSON.parse(data) : []
    }

    async write (data) {
        await fs.writeFile(this.dir_name, JSON.stringify(data, null, 2), "utf-8")
    }
}

module.exports = IO