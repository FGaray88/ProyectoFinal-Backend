// @ts-nocheck
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {
  consoleLogger,
  errorLogger,
} = require("../logger/logger")
const { sendMailNewUser } = require('../nodemailer/gmail');
const { sendMail } = require("../nodemailer/ethereal")
const UsersDao = require('../model/daos/users/Users.dao');
const CartsDao = require("../model/daos/carts/carts.mongo.dao")
const { formatUserForDB } = require('../utils/users.utils');

const User = new UsersDao();
const Cart = new CartsDao();
UsersDao.connect()

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// sign up
passport.use('signup', new LocalStrategy(
  { passReqToCallback: true, },
  async (req, username, password, done) => {
  try {
    const { username, password, phone } = req.body;
    const cart = await Cart.save({ items: [] });
    const userItem = {
      username: username,
      password: createHash(password),
      cart,
      phone,
    };
    const newUser = formatUserForDB(userItem);
    const user = await User.createUser(newUser);
    consoleLogger.info("User registration successfull");
    await sendMail(user.username)
    await sendMailNewUser(user.username)
    return done(null, user);
  }
  catch(error) {
    errorLogger.error("Error signuping user up...");
    errorLogger.error(error);
    return done(error);
  }
}));

// sign in
passport.use('signin', new LocalStrategy( async (username, password, done) => {
  try {
    const user = await User.getByEmail(username);
    if (!isValidPassword(user, password)) {
      errorLogger.error("Invalid user or password");
      return done(null, false);
    }
    return done(null, user);
  }
  catch(error) {
    errorLogger.error("Error signing in...");
    return done(error);
  }
}))

// Serialization
passport.serializeUser((user, done) => {
  done(null, user._id);
})

// Deserialization
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.getById(id);
    done(null, user);
  }
  catch(error) {
    done(error)
  }
})

module.exports = passport;