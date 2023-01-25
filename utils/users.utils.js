const formatUserForDB = (userObj) => {
  const newUser = {
    username: userObj.username,
    password: userObj.password,
    createdAt: new Date(),
    updatedAt: new Date(),
    cart: userObj.cart,
    phone: userObj.phone
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}