const users = [];
const addUser = (id, room, name, profile) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  const user = { id, name, profile, room };
  users.push(user);
  return { id, name: user.name, profile: user.profile };
};
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};
const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (room) => users.filter((user) => user.room === room);
module.exports = { addUser, removeUser, getUser, getUsersInRoom };
