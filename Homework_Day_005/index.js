const fs = require("fs")



const main = async () => {
    const readStream = fs.createReadStream("./info.txt")
    const writeStream = fs.createWriteStream("./test.txt")
    
    readStream.pipe(writeStream)


}
main()