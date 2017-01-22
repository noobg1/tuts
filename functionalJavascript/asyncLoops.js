function loadUsers(userIds, load, done) {
    var users = []
    
    function toLoad(user){
        users.push(load(user));
    }
    unserIds.forEach(toLoad);
    return users;
}

module.exports = loadUsers;