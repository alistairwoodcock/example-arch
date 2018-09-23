class UserDetails {

    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    getUsers() {
        return this.userRepo.getUsers();
    }

    setupCommandHandlers(handler) {
    
        handler.on('USERS', (query) => {
            const users = this.getUsers();

            return users;
        })

    }

}

module.exports = UserDetails;