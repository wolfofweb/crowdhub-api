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
import multer from "multer";

//MIDDLEWARES
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
//TO SEND JSON OBJECTS
app.use(Express.json())
//FOR CROSS ORIGIN(DIFFERENT HOSTS)
app.use(cors({
    origin: "https://crowdhub.netlify.app"
}))
app.use(cookieParser())

//IMAGE UPLOAD MANAGEMENT AND ITS NAMING
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})

//GETTING ALL THE ENDPOINTS(ROUTES)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/relationships", relationshipRoutes)

const PORT=8800;
//STARTING THE BACKEND SERVER
app.listen(process.env.PORT||PORT, () => {
    console.log(`API WORKING!!! on ${PORT}`)
})
