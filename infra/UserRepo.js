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
        this.users = this.users.map(u => {
            if(user.id !== u.id) return u;
            return user;
        });
    }

    createUser(name, balance) {
        let found = this.users.find(u => u.name === name);

        if(found) return false;

        this.users.push({
            id: this.users.length,
            name,
            balance,
        });

        return true;
    }

}

module.exports = UserRepo;