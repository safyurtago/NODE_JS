// Local modules
const IO = require('../utils/io')
const Users = new IO(process.cwd() + '/database/users.json')
const Groups = new IO(process.cwd() + '/database/groups.json')


// Models
const User = require('../models/User.model')
const Group = require('../models/Group.model')

const createGroup = async (groupname, authorname) => {
    const groups = await Groups.read()
    const id = (groups[groups.length - 1]?.id || 0) + 1
    const newGroup = new Group(id, groupname, authorname)
    newGroup.groupUsers.push(authorname)
    const data = groups.length ? [... groups, newGroup] : [newGroup]
    await Groups.write(data)
}

module.exports = createGroup;