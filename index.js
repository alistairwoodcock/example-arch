const HttpInfra = require("./infra/http");
const AppEvents = require("./infra/AppEvents");
const EventStore = require("./infra/EventStore");

const UserRepo = require("./infra/UserRepo");
const UserPayments = require("./app/UserPayments");

const UserDetails = require("./app/UserDetails");



(() => {

    const config = {
        run: true,
        replay: false,
    };

    const port = 3000; // TODO: Pull from config

    const eventStore = new EventStore("./events.json");

    const appEvents = new AppEvents(eventStore);

    // TODO: Real DB
    userRepo = new UserRepo([
        {id: 0, name: "Test0", balance: 100},
        {id: 1, name: "Test1", balance: 0},
        {id: 2, name: "Test2", balance: 10},
        {id: 3, name: "Test3", balance: 33},
    ]);

    const userDetails = new UserDetails(userRepo);
    userDetails.setupCommandHandlers(appEvents);

    const userPayments = new UserPayments(userRepo);
    userPayments.setupCommandHandlers(appEvents);

    if(config.run) 
    {
        httpInfra = new HttpInfra(
            port, 
            appEvents,
        );

        httpInfra.run();    
    }
    else if (config.replay)
    {

        let events = require("./replay_events.json");

        for(let i = 0; i < events.length; i++) {
            let event = events[i];

            let result;

            switch(event.type) {
                case 'QUERY': result = appEvents.query(event.name, event.data); break;
                case 'COMMAND': result = appEvents.command(event.name, event.data); break;
            }

            console.log("result: ", result);
        }

        console.log("Finished replaying events");
    }
})();
