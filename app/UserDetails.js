class UserDetails {

    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    getUsers() {
        return this.userRepo.getUsers();
    }

    createUser(userName, balance) {
        
        if (balance < 0) return {success: false, reason: "invalid initial balance"};

        let success = this.userRepo.createUser(userName, balance);

        return {
            success,
        }
    }

    setupCommandHandlers(handler) {
        
        handler.on('GET_USERS_LIST', (query) => {
            return this.getUsers();
        });

        handler.on('CREATE_USER', (command) => {
            let {userName, balance} = command;
            return this.createUser(userName, balance)
        });
    }

}

module.exports = UserDetails;