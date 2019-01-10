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
};
