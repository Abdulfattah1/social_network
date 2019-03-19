const express = require("express");
const checkAuth = require("../middleWares/check_auth");
const router = express.Router();

const commentController = require("../controllers/commentController");

router.post("/addComment", checkAuth, commentController.addComment);
router.get("/getComments", checkAuth, commentController.getComments);
module.exports = router;
