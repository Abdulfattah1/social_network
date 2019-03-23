const Comment = require("../models/comment");
const Post = require("../models/PostModel");
module.exports.addComment = (req, res, next) => {
  const userId = req.userInformation.userId;
  const data = req.body;
  const comment = new Comment(data.postId, userId, data.textContent);
  comment
    .addComment()
    .then(result => {
      return Comment.increaseNumberOfComments(data.postId);
    })
    .then(number => {
      return res.json({
        success: true,
        message: "your comment was add correctly"
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: err
      });
    });
};

module.exports.getComments = (req, res, next) => {
  const postId = +req.query.postId;
  Comment.getComments(postId)
    .then(result => {
      return res.json({
        success: true,
        message: "all comment for " + postId,
        comments: result[0]
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: err
      });
    });
};

module.exports.deleteComment = (req,res,next)=>{
  const postId = req.params.id;
  const userId = req.userInformation.userId;
  Comment.delete(postId,userId)
  .then(res=>{
  })
}
