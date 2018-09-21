const Express = require('express');
const bodyParser = require('body-parser');

class HttpInfra {

    constructor(port, appEvents) {

        this.port = port;
        this.appEvents = appEvents;

        const express = Express();

        express.use(bodyParser.json());

        this.setupRoutes(express);

        this.express = express;
    }

    run() {
        this.express.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}!`)
        });
    }

    setupRoutes(express) {
        express.post('/pay', (req, res) => {
            let fromUser = req.body.from;
            let toUser = req.body.to;
            let amount = req.body.amount;

            console.log(req.body);

            this.appEvents.command('USER_PAYMENT', {
                fromUserId: fromUser,
                toUserId: toUser,
                amount,
            });

           res.send("payment processing.");
        });

        express.get('/users', (req, res) => {

            let users = this.appEvents.query('USERS');

            users = users.map(user => ({
                id: user.id,
                name: user.name,
                balance: user.balance
            }));

            res.json(users);
        });
    }

};


module.exports = HttpInfra;