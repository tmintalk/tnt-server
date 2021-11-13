const users = [];
let usersReadCnt = [{ name: "test", roomId: "test", messageCnt: 0 }];
const addUser = (id, room, name, picture) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, picture, room };

  users.push(user);

  return { id, name: user.name, picture: user.picture };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const updateReadCnt = (name, roomId, messageCnt) => {
  if (!name) {
    console.log("if undefined", name);
    return;
  }
  readInfo = { name: name, roomId: roomId, messageCnt: messageCnt };
  console.log(
    name,
    usersReadCnt.find((u) => {
      return u.name == name && u.roomId == roomId;
    })
  );
  if (
    usersReadCnt.find((u) => {
      return u.name == name && u.roomId == roomId;
    })
  ) {
    console.log("exist");
    usersReadCnt = usersReadCnt.filter((u) => {
      return u.name !== name || u.roomId !== roomId;
    });
    usersReadCnt.push(readInfo);
  } else {
    console.log("no exist");
    usersReadCnt.push(readInfo);
  }

  console.log(usersReadCnt);
};
const getMyReadCnt = (name) => {
  return usersReadCnt.filter((u) => u.name === name);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  updateReadCnt,
  getMyReadCnt,
};
