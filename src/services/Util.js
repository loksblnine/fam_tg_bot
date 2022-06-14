const UserController = require("../controllers/UserController");

const isUserInDatabase = (userId) => {
  return UserController.findOneByUserId(userId);
};

const filterNonExist = (usersArray) => {
  let array = [];

  usersArray.forEach(async (user, id, array) => {
    console.log(isUserInDatabase(user.id));
    if (!isUserInDatabase(user.id)) {
      await UserController.createUser(user.username, user.id);
      array.push(user);
    }
  });

  return array;
};

const concatUserAppeal = (usersArray) => {
  let string = "";

  usersArray.forEach(async (user, id, array) => {
    string += `[${user.username}](tg://user?id=${user.id})`;
    if (array.length <= id - 1) {
      string += ', ';
    }
  });

  return string;
};

module.exports = {
  concatUserAppeal,
  filterNonExist
};