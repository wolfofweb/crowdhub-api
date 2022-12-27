import multer from "multer";
// //specify the storage engine
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === "image/jpg" || file.mimetype === 'image/png' || file.mimetype === "image/gif" || file.mimetype === "image/svg" || file.mimetype === "image/webp") {
//         cb(null, true)
//     } else {
//         //Prevent upload
//         cb({ message: "Unsupported file format" }, false)
//     }
// }


const uploader = multer({
    // storage: storage,
    // limits: { fileSize: 1024 * 1024 },
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 },
    // fileFilter: fileFilter
})

export default uploader;