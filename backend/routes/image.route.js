import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up storage with multer.diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

// Use the storage to initialize multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // limit file size to 5MB
  },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the following filetypes - " + filetypes
    );
  },
});

// Set up the POST route
router.post("/upload", upload.array("images", 2), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  // Convert files into an array of filenames
  const images = files.map((file) => file.filename);

  res.send(images);
});

router.get("/:filename", (req, res) => {
  console.log(req.params.filename);
  res.sendFile(path.resolve(`./public/images/${req.params.filename}`));
});

export default router;
