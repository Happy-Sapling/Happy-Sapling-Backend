const config = require("../config/auth.config");
const nodemailer = require("../config/nodemailer.config");
const User = require("../models/user-model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

createUser = async (req, res) => {
  const token = jwt.sign({ email: req.body.email }, config.secret);
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a user",
    });
  }

  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password, 8),
    confirmationCode: token,
  });

  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }
  try {
    await user.save();
    res.send({
      message: "User was registered successfully! Please check your email",
    });
    nodemailer.sendConfirmationEmail(
      user.firstName,
      user.email,
      user.confirmationCode
    );
  } catch (error) {
    return res.status(400).json({
      error,
      message: "User was not created",
    });
  }
};

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, async (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.email = body.email;

    try {
      await user.save();
      return res.status(200).json({
        success: true,
        id: user._id,
        message: "User updated!",
      });
    } catch (error) {
      return res.status(404).json({
        error,
        message: "User not updated!",
      });
    }
  });
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch((err) => console.log(err));
};

signIn = async (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: "Something went wrong." });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    if (user.status != "Active") {
      return res.status(403).send({
        message: "Pending Account. Please verify your email!",
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
      status: user.status,
    });
  });
};

verifyUser = async (req, res, next) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res
          .status(200)
          .send({ message: "Thank you for verifying your account." });
        return;
      });
    })
    .catch((e) => console.log("error", e));
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  signIn,
  verifyUser,
};
