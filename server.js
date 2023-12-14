require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const ConnectDB = require("./config/dbConfig");
const mongoose = require("mongoose");
const multer = require("multer");
const s3 = require("./services/s3");

//environment variables

const PORT = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV;
const mySetting = process.env.MY_SETTING;

//ConnectDB
ConnectDB();

//Custome Middleware Function
app.use(logger);

//Cross Origin Resourse Sharing
app.use(cors(corsOptions));

//Built-in middleware for json
app.use(express.json());

//Built in middleware functions to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//Serve the static files
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));

//API route
app.use("/members", require("./routes/api/members"));
app.use("/events", require("./routes/api/events"));
app.use("/images", require("./routes/api/images"));


// Image Storage

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

// single file
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10000000, files: 2 },
});
app.post("/upload", upload.array("image"), async (req, res) => {
  try{
    const results = await s3.s3Upload(req.files);
    console.log(results);
    res.json({ status: "Success" });
  }catch(err){
    console.error(err);
  }
});


app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.json({
        message: "File is too large.",
      });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.json({
        message: "Files limit reached.",
      });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.json({
        message: "File must be an image.",
      });
    }
  }
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

//Error Handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`Member Directory is listening on port ${PORT}`);
  });
});
