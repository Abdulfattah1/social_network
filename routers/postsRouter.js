const express = require("express");
const checkAuth = require("../middleWares/check_auth");
const { check } = require("express-validator/check");
const multer = require("multer"); // to upload files

const router = express.Router();

const postController = require("../controllers/postsController");

const type = {
  "image/jpeg": "jpg",
  "image/jpng": "png"
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    let name =
      file.originalname.split(" ")[0].trim() +
      Date.now() +
      "." +
      type[file.mimetype];
    cb(null, name);
  }
});

router.post(
  "/createPost",
  checkAuth,
  multer({ storage: storage }).single("image"),
  postController.createPost
);

router.post(
  "/like",
  checkAuth,
  check("postId").isLength({
    min: 1
  }),
  postController.like
);

router.post(
  "/disLike",
  checkAuth,
  check("postId").isLength({
    min: 1
  }),
  postController.disLike
);

router.post(
  "/checkLike",
  checkAuth,
  check("postId").isLength({
    min: 1
  }),
  postController.checkLike
);

router.get("/getAllPosts", postController.getAllPosts);

router.get("/getPosts", postController.getPosts);

router.post("/getNumberOfLikes", checkAuth, postController.getNumberOfLikes);

router.get("/getLikesWithNames", checkAuth, postController.getLikesWithNames);

router.delete("/deletePost", checkAuth, postController.deletePost);

router.post(
  "/editPost",
  checkAuth,
  check(["textContent"])
    .isLength({
      min: 3
    })
    .withMessage("it must be more than 2 chracter"),
  check("postId")
    .isEmpty()
    .withMessage("post id is required"),
  postController.editPost
);
module.exports = router;
