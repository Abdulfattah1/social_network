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

module.exports = router;
