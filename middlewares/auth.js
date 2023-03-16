const auth = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      next();
    }
    else {
      res.redirect('/');
    }
  }
  catch (error) {
    errorLogger.error(error);
}  
};

module.exports = auth;