const { validationResult } = require("express-validator/check");
const Post = require("../models/postModel");
module.exports.createPost = (req, res, next) => {
  userInfo = req.userInformation;

  const errors = validationResult(req);
  const responseErrorArray = [];
  if (!errors.isEmpty()) {
    errorsArray = errors.array();
    for (let i = 0; i < errorsArray.length; i++) {
      responseErrorArray.push(errorsArray[i].msg);
    }

    return res.json({
      success: false,
      message: responseErrorArray
    });
  }

  const post = new Post(req.body.textarea, userInfo.userId);
  post
    .createPost()
    .then(result => {
      if (result.affectedRows <= 0) {
        return res.json({
          success: false,
          message: "fail to add the post"
        });
      }
      return res.json({
        success: true,
        message: "the post was added successfully"
      });
    })
    .catch(err => {
      console.log(err);
    });
};
