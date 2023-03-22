import connection from "./db/conn.js";
import express from "express";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";
import multer from "multer";
import { serveImages } from "./routes/image.js";
const app = express();

const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use("/images", serveImages);
app.use(cors({ origin: "*", credentials: true }));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

//database
connection();

//Adding file Object

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//Routes
app.get("/", (req, res) => {
  res.send("Helllllll.....");
});

//Listening

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
