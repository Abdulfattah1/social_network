const express = require("express");
const checkAuth = require("../middleWares/check_auth");
const { check } = require("express-validator/check");
const router = express.Router();

const postController = require("../controllers/postsController");

router.post(
  "/createPost",
  checkAuth,
  check("textarea")
    .isLength({
      min: 3
    })
    .withMessage("it should be more than 3 charactors"),
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
