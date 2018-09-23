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

            let result = this.appEvents.command('TRANSFER_MONEY', {
                fromUserId: fromUser,
                toUserId: toUser,
                amount,
            });

           res.json(result);
        });

        express.get('/users', (req, res) => {

            let users = this.appEvents.query('GET_USERS_LIST');

            res.json(users);
        });
    }

};


module.exports = HttpInfra;