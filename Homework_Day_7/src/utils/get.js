async function getUsers(Users) {
    return await Users.read();
}

module.exports = getUsers