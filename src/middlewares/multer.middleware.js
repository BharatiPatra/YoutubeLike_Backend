import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname); //this is not good as user has same file name for tiny amount the file on server then upload on cloudinary and delete(unlink) the file
  },
});
// console.log("STORAGE", storage);//object

export const upload = multer({ storage });
