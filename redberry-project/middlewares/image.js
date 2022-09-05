const multer = require('multer')
const randomBytes = require('random-bytes')
const allowed_types =  ["image/png", "image/jpg", "image/jpeg"]

const fileFilter = (request, file, callback) => {

    if (allowed_types.includes(file.mimetype)) {
        callback (null, true)
    } else {
        callback(null, false)
    }
}  

const storage = multer.diskStorage(
    {
        destination(request, file, callback) {
            callback(null, 'public/images/uploads/laptop_images')
        },

        filename(request, file, callback) {
           const splited_original_name = file.originalname.split(".")

           const format = splited_original_name[splited_original_name.length - 1]


           randomBytes(12, (error, buffer) => {
               if (error) {
                   return false
               }

               const dinamic_string = buffer.toString("hex")

               const dinamic_file_name = `${dinamic_string}.${format}`

               callback(null, dinamic_file_name)
           })
        }
    }
)

module.exports = multer({ storage, fileFilter })