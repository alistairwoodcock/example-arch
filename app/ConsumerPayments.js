
class ConsumerPayments {
    
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    // Note: This is the basic idea but I've screwed up one important thing
    //       we want to avoid side effects in our code. modifying the from and
    //       to users directly is not ideal.

    // TODO: Rip out this return structure
    makePayment(fromUser, toUser, amount) {
        if(amount <= 0) return [false, "invalid amount"];

        if (!fromUser) return [false, "invalid from user"];
        if (!toUser) return [false, "invalid to user"];

        if(fromUser.id === toUser.id) return [false, "from and to user the same"];

        if (fromUser.balance <= 0) return [false, "invalid balance on from user"];
        if (fromUser.balance < amount) return [false, "invalid balance on to user"];

        fromUser.balance -= amount;
        toUser.balance += amount;

        return [true, ""];
    }

    // These command handlers can accept or reject the commands
    setupCommandHandlers(handler) {


        handler.on('USER_PAYMENT', (command) => {
            
            let fromUser = this.userRepo.getUserById(command.fromUserId);
            let toUser = this.userRepo.getUserById(command.toUserId);

            const [success, reason] = this.makePayment(
                fromUser, 
                toUser, 
                command.amount
            );

            this.userRepo.saveUser(fromUser);
            this.userRepo.saveUser(toUser);

            if(!success) {
                handler.command('USER_PAYMENT_FAILED', {...command, reason});
            } else {
                handler.command('USER_PAYMENT_SUCCESS', command);
            }
        });

        handler.on('USER_PAYMENT_SUCCESS', (command) => {

            // TODO: send to notification services
            // actually, they might be registered to this event..
            // we need to figure out how to register in their own
            // module locations rather than all here;

        });

        handler.on('USER_PAYMENT_FAILED', (command) => {

        })

    }

}

module.exports = ConsumerPayments;
