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
  let imageUrl;
  if (req.file) {
    let url = req.protocol + "://" + req.get("host");
    imageUrl = url + "/images/" + req.file.filename || null;
  } else {
    imageUrl = null;
  }
  const post = new Post(req.body.textarea, userInfo.userId, imageUrl);
  post
    .createPost()
    .then(result => {
      if (result.affectedRows <= 0) {
        return res.json({
          success: false,
          message: "faild to add the post"
        });
      }
      return res.json({
        success: true,
        message: "the post was added successfully",
        postId: result[0].insertId,
        imageUrl: imageUrl || null
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.deletePost = (req, res, next) => {
  const userId = req.userInformation.userId;
  const postId = req.query["postId"];

  Post.deletePost(postId, userId)
    .then(result => {
      if (result.affectedRows == 0) {
        return res.json({
          success: false,
          message: "post was not deleted"
        });
      }
      return res.json({
        success: true,
        message: "post was deleted"
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: err
      });
    });
};

module.exports.editPost = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty) {
    return res.json({
      success: false,
      message: err.array()
    });
  }
  const postId = req.body.postId;
  const textContent = req.body.textContent;
  const userId = req.userInformation.userId;

  Post.editPost(postId, userId, textContent)
    .then(result => {
      if (result.affectedRows == 0) {
        return res.json({
          success: false,
          message: "not deleted"
        });
      }
      return res.json({
        success: true,
        message: "edited"
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: err
      });
    });
};

module.exports.getAllPosts = (req, res, next) => {
  const now = new Date();

  Post.getAllPosts()
    .then(result => {
      return res.json({
        success: true,
        message: "it was done correctly",
        posts: result[0]
      });
    })
    .catch(err => {
      console.log(err);
      return res.json({
        success: false,
        message: err
      });
    });
};


module.exports.getPosts = (req, res, next) => {

  let page = (+req.query.page);
  let number = +req.query.number;

  let start, numberOfPosts;
  start = page * number;
  numberOfPosts = number;
  Post.getPosts(start, numberOfPosts)
    .then(POSTS => {
      return res.json({
        success: true,
        message: "it was loaded correctly",
        posts: POSTS[0]
      })
    })
    .catch(err=>{
      res.json({
        success:false,
        message:err
      })
    })
}

module.exports.like = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.json({
      success: false,
      message: err.array()[0].msg
    });
  }
  const postId = req.body.postId;
  const userId = req.userInformation.userId;
  Post.like(postId, userId)
    .then(result => {
      return res.json({
        success: true,
        message: "liked !"
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: err
      });
    });
};

module.exports.disLike = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.json({
      success: false,
      message: err.array()[0].msg
    });
  }
  const postId = req.body.postId;
  const userId = req.userInformation.userId;
  Post.disLike(postId, userId)
    .then(result => {
      return res.json({
        success: true,
        message: "disLiked !"
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: err
      });
    });
};

module.exports.checkLike = (req, res, next) => {
  const postId = req.body.postId;
  const userId = req.userInformation.userId;

  Post.checkLike(userId, postId)
    .then(result => {
      if (result[0].length !== 0) {
        return res.json({
          success: true,
          message: "found"
        });
      }
      return res.json({
        success: true,
        message: "not found"
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: err
      });
    });
};

module.exports.getNumberOfLikes = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.json({
      success: false,
      message: err.array()[0].msg
    });
  }
  Post.getNumberOfLikes(req.body.postId)
    .then(result => {
      return res.json({
        success: true,
        count: result[0][0].count
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: err
      });
    });
};

module.exports.getLikesWithNames = (req, res, next) => {
  const postId = +req.query["postId"];
  Post.getLikesWithNames(postId)
    .then(result => {
      return res.json({
        success: true,
        message: "you have got all the likes for this post",
        likes: result[0]
      });
    })
    .catch(err => {
      return res.json({
        success: false,
        message: err
      });
    });
};
