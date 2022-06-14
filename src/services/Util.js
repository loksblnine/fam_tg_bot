const UserController = require("../controllers/UserController");

function isUserInDatabase(userId) {
  return UserController.findOneByUserId(userId);
}

function concatUserAppeal(usersArray) {
  let string = "";
  usersArray.forEach((user, id, array) => {
    string += `[${user.username}](tg://user?id=${user.id})`;
    if (array.length >= id - 1) {
      string += ', ';
    }
  });
  return string;
}

module.exports = {
  isUserInDatabase,
  concatUserAppeal
};