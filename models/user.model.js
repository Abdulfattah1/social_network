const db = require("../utilites/db");

module.exports = class User {
  constructor(values) {
    this.firstName = values.firstName;
    this.lastName = values.lastName;
    this.email = values.email;
    this.password = values.password;
    this.gender = values.gender;
    this.birthday = values.birthday;
  }

  save() {
    return db.execute(
      `insert into users (firstName,lastName,email ,password,birthday,gender) 
    values(?,?,?,?,?,?)`,
      [
        this.firstName,
        this.lastName,
        this.email,
        this.password,
        this.birthday,
        this.gender
      ]
    );
  }
  static validation(values) {
    //first name
    if (!values.firstName || values.firstName === "") {
      return "firstName is required";
    }
    if (values.firstName.length < 3) {
      return "firstName must be more than 2 character ";
    }

    //last name
    if (!values.lastName || values.lastName === "") {
      return "lastName is required";
    }
    if (values.lastName.length < 3) {
      return "lastName must be more than 2 characters ";
    }

    //email
    if (!values.email || values.email === "") {
      console.log(values.email);
      return "email is required";
    }
    //gender
    if (!values.gender || values.gender === "") {
      return "gender is required";
    }
    if (values.gender != "male" && values.gender != "famele") {
      return "gender's value must be male or famele";
    }

    //password
    if (!values.password || values.password === "") {
      return false;
    }
    if (values.password.length < 8) {
      return "lastName must be more than 7 characters ";
    }

    if (values.password !== values.confirmPassword) {
      return "Password does not match";
    }
    return true;
  }

  static getUserByEmail(email) {
    return db.execute("select * from users where users.email = ?", [email]);
  }

  static getUserById(userId) {
    return db.execute("select * from users where users.id = ? ", [userId]);
  }
};
