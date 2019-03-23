const db = require("../utilites/db");

module.exports = class comments {
  constructor(
    postId,
    userId,
    textContent = null,
    imageUrl = null,
    pdfUrl = null
  ) {
    this.postId = postId;
    this.userId = userId;
    this.textContent = textContent;
    this.imageUrl = imageUrl;
    this.pdfUrl = pdfUrl;
  }

  static increaseNumberOfComments(postId) {
    return db.execute(
      "update numbers set numberOfComments = numberOfComments + ? where postId = ?",
      [1, postId]
    );
  }
  addComment() {
    return db.execute(
      "insert into comments(postId,userId,textContent,imageUrl,pdfUrl) values(?,?,?,?,?)",
      [this.postId, this.userId, this.textContent, this.imageUrl, this.pdfUrl]
    );
  }

  static getComments(postId) {
    return db.execute(
      `select users.firstName , users.lastName , users.personalImage ,
    comments.textContent , comments.dateOfPosting 
    from comments 
    inner join users on comments.userId = users.id
    where comments.postId = ?
    order by comments.dateOfPosting desc`,
      [postId]
    );
  }
};
