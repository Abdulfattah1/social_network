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
      `select 
      count(likes.postId) as NumberOfLikes ,
      posts.postId,
      users.firstName , 
      users.lastName ,
      users.personalImage,
      
      posts.postId , 
      posts.userId,
      posts.imageUrl,
      posts.pdfUrl,
      posts.textContent,
      posts.dateOfPosting
      from posts 
      left join users on posts.userId = users.id 
      left join likes on posts.postId = likes.postId
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

  static checkLike(userId, postId) {
    return db.execute(
      "select * from likes where likes.userId = ? and likes.postId = ?",
      [userId, postId]
    );
  }

  static getNumberOfLikes(postId) {
    return db.execute(
      `select count(likes.postId) as count from posts left join likes on posts.postId = likes.postId where posts.postId =  ?`,
      [postId]
    );
  }

  static getLikesWithNames(postId) {
    return db.execute(
      `select users.firstName , users.lastName from likes 
      inner join users on likes.userId = users.id where likes.postId = ?`,
      [postId]
    );
  }

  static deleteAllLikes(postId) {
    return db.execute("delete from likes where postId = ?", [postId]);
  }

  static deleteAllCommnets(postId) {
    return db.execute("delete from comments where postId = ?", [postId]);
  }

  static deletePost(postId, userId) {
    this.deleteAllLikes(postId).then(result => {});
    this.deleteAllCommnets(postId).then(result => {});
    return db.execute("delete from posts where postId = ? and userId = ?", [
      postId,
      userId
    ]);
  }

  static editPost(postId, userId, textContent) {
    return db.execute(
      "update posts set textContent = ? where postId = ? and userId = ?",
      [textContent, postId, userId]
    );
  }
};
