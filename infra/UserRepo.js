class UserRepo {
    
    //  TODO: Real DB Connection stuff should actually be happening in here

    constructor(users) {
        this.users = users;
    }

    getUsers() {
        return this.users;
    }

    getUserById(id) {
        return this.users.find(u => u.id === id);
    } 

    saveUser(user) {
        // nothing to do here because we've got no real DB
    }

}

module.exports = UserRepo;