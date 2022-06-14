const UserController = require("../controllers/UserController");

const isUserInDatabase = (userId) => {
  return UserController.findOneByUserId(userId);
};

const filterNonExist = (usersArray) => {
  let array = [];

  usersArray.forEach((user, id, array) => {
    if (!isUserInDatabase(user.id)) {
      console.log(5432, true);
      UserController.createUser(user.username, user.id)
        .then(() => {
          console.log(111, user);
          array.push(user);
        });
    }
  });
  console.log("final array ", array);
  return array;
};

const concatUserAppeal = (usersArray) => {
  let string = "";

  usersArray.forEach((user, id, array) => {
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