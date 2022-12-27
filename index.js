import Express from "express";
const app = Express()
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import authRoutes from "./routes/auth.js"
import relationshipRoutes from "./routes/relationships.js"
import cookieParser from "cookie-parser";
import cors from "cors"
// import multer from "multer";
// import bodyParser from "body-parser";
// import upload from "./multer.js";
// import { uploads } from "./cloudinary.js";
// import fs from 'fs';
import uploader from "./multer.js";
import cloudinary from "./cloudinary.js";




//MIDDLEWARES
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

//TO SEND JSON OBJECTS
app.use(Express.json())
//FOR CROSS ORIGIN(DIFFERENT HOSTS)
app.use(cors({
    origin: "https://crowdhub.netlify.app"
}))
app.use(cookieParser())


//IMAGE UPLOAD MANAGEMENT AND ITS NAMING
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../frontend/public/upload')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname)
//     }
// })

// const upload = multer({ storage: storage })

// app.post("/api/upload", upload.single("file"), (req, res) => {
//     const file = req.file;
//     res.status(200).json(file.filename);
// })

//GETTING ALL THE ENDPOINTS(ROUTES)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/relationships", relationshipRoutes)
// app.use("/api/upload", upload.array('file'), async (req, res) => {
//     const uploader = async (path) => await uploads(path, "Images")
//     if (req.method === 'POST') {
//         const urls = []
//         const files = req.files
//         for (const file of files) {
//             const { path } = file
//             const newPath = await uploader(path)
//             urls.push(newPath)
//             fs.unlinkSync(path)
//         }
//         res.status(200).json({
//             message: "Image uploaded successfully",
//             data: urls
//         })
//     } else {
//         res.status(405).json({
//             err: "Image is not uploaded"
//         })
//     }
// })
app.use("/api/upload", uploader.single("file"), async (req, res) => {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json({
        success: true,
        file: upload.secure_url,
    })
})


const PORT = 8800;
//STARTING THE BACKEND SERVER
app.listen(process.env.PORT || PORT, () => {
    console.log(`API WORKING!!! on ${PORT}`)
})
