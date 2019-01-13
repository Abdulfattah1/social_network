const db = require("../utilites/db");

module.exports = class Post {
  constructor(textContent, userId, imgUrl = null, pdfUrl = null) {
    this.textContent = textContent;
    this.imgUrl = imgUrl;
    this.pdfUrl = pdfUrl;
    this.userId = userId;
  }

  createPost() {
    return db.execute(
      "insert into posts (textContent,imageUrl,pdfUrl,userId) values(?,?,?,?)",
      [this.textContent, this.imgUrl, this.pdfUrl, this.userId]
    );
  }

  static getAllPosts() {
    return db.execute(
      `select count(*) numberOfLikes  , posts.postId , users.firstName , users.lastName , users.personalImage ,  posts.dateOfPosting , posts.textContent  from likes  
      right join posts on likes.postId = posts.postId 
      join users on users.id = posts.userId
      group by posts.postId
      order by posts.dateOfPosting desc`
    );
  }

  static like(postId, userId) {
    return db.execute("insert into likes(userId,postId) values(?,?)", [
      userId,
      postId
    ]);
  }

  static disLike(postId, userId) {
    return db.execute("delete from likes where postId = ? and userId = ?", [
      postId,
      userId
    ]);
  }
};
