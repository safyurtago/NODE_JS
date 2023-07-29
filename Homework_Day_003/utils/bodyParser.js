const bodyParser = (request) => {
    return new Promise((resolve, reject) => {
        try {
            request.on("data", (chunk) => {
                resolve(JSON.parse(chunk))
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

module.exports = bodyParser