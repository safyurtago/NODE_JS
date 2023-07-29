const fs = require("fs").promises

class IO {
    #dir
    constructor (dir) {
        this.#dir = dir
    }

    async read() {
        const data = await fs.readFile(this.#dir, "utf-8")
        return data.length ? JSON.parse(data, null, 2) : []
    }

    async write (data) {
        await fs.writeFile(this.#dir, JSON.stringify(data, null, 2), "utf-8")
    }
}


module.exports = IO;