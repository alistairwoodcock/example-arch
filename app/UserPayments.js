
class UserPayments {
    
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    exchangeAmount(fromUser, toUser, amount) {

        let payer = {...fromUser};
        let payee = {...toUser};

        payer.balance -= amount;
        payee.balance += amount;

        return [payer, payee];
    }

    transferMoney(fromUserId, toUserId, amount) {

        if(amount <= 0) return {success: false, reason: "invalid amount"}; // new Rejected("invalid amount"); 

        if(fromUserId == null) return {success: false, reason: "Missing fromUserId"};
        if(toUserId == null) return {success: false, reason: "Missing toUserId"};

        if(fromUserId === toUserId) return {success: false, reason: "from and to user the same"};

        let fromUser = this.userRepo.getUserById(fromUserId);
        let toUser = this.userRepo.getUserById(toUserId);

        if (!fromUser) return {success: false, reason: "unable to find fromUser"}; // new CommandResponse(false, "invalid from user"); 
        if (!toUser) return {success: false, reason: "unable to find toUser"};

        if (fromUser.balance <= 0) return {success: false, reason: "invalid balance on fromUser"};
        if (fromUser.balance < amount) return {success: false, reason: "invalid balance on fromUser"};

        [fromUser, toUser] = this.exchangeAmount(
            fromUser, 
            toUser, 
            amount
        );

        this.userRepo.saveUser(fromUser);
        this.userRepo.saveUser(toUser);

        return {success: true, reason: ""};
    }

    // These command handlers can accept or reject the commands
    setupCommandHandlers(handler) {
        handler.on('TRANSFER_MONEY', (command) => {
            let {fromUserId, toUserId, amount} = command;
            return this.transferMoney(fromUserId, toUserId, amount);
        });

    }

}

module.exports = UserPayments;
