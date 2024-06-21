const boom = require("boom");
const db = require("../model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
//get all user
exports.getAllUser = async (req, reply) => {
  try {
    let users = await db.userModel.findAll({});
    return users;
  } catch (err) {
    throw boom.boomify(err);
  }
};
// get single user by id
exports.getSingleUser = async (req, reply) => {
  try {
    const id = req.params.id;
    let user = await db.userModel.findOne({ where: { id: id } });
    return user;
  } catch (err) {
    throw boom.boomify(err);
  }
};
//add new user
exports.addNewUser = async (req, reply) => {
  try {
    const emailExtis = await db.userModel.findOne({
      where: { email: req.body.email },
    });
    if (emailExtis) {
      return {
        status: 204,
        message: "email id alredy exits",
      };
    }
    const userExtis = await db.userModel.findOne({
      where: { userName: req.body.userName },
    });
    if (userExtis) {
      return {
        status: 205,
        message: "UserName alredy exits",
      };
    } else {
      const userCreated = await db.userModel.create(req.body);
      return {
        status: 200,
        message: "User Created Sucssfully",
      };
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};
//update user by id
exports.updateUser = async (req, reply) => {
  try {
    const id = req.params.id;
    if (req.params.id) {
      if (req.file) {
        let userresults = await db.userModel.update(
          {
            profileImage: "images/" + req.file.filename,
          },
          { where: { id: id } }
        );
        return {
          status: 200,
          message: "profile update successfully",
        };
      } else {
        let userresults = await db.userModel.update(req.body, {
          where: { id: id },
        });
        return {
          status: 200,
          message: "profile update successfully",
        };
      }
    } else {
      return {
        status: 404,
        message: "Req body and params is null",
      };
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};
//delete user by id
exports.deleteUser = async (req, reply) => {
  try {
    const id = req.params.id;
    if (req.params.id) {
      let userResults = await db.userModel.destroy({ where: { id: id } });
      return { status: 200, Message: "Post Deleted" };
    }
    else{
        return { status: 404, Message: "Can't Deleted id null " }; 
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};
//user login
exports.loginUser = async (req, reply) => {
  try {
    let userExits = await db.userModel.findOne({
      userName: req.body.userName,
      status: 1,
    });
    if (userExits) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        userExits.password
      );
      if (!passwordIsValid) {
        return {
          status: 401,
          message: "invalid password",
        };
      } else {
        var token = jwt.sign({ id: userExits._id }, "test-code", {
          expiresIn: "12d",
        });
        return {
          status: 200,
          token: token,
        };
      }
    } else {
      return {
        status: 404,
        message: "Invalid username",
      };
    }
  } catch (err) {
    throw boom.boomify(err);
  }
};
