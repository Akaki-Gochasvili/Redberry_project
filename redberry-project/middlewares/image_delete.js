const fs = require('fs');
const path = require('path')
module.exports = function  (filename) {
    console.log("THIS IS REQUEST FILENAME:", filename)
    try {
        fs.unlinkSync(`${path.dirname(path.dirname(__filename))}/public/images/uploads/laptop_images/${filename}`)
        console.log("IMAGE DELETED")

        return true
    } catch(error) {
        console.error(error)
        return false
    }

}