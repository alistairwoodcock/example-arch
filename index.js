const HttpInfra = require("./infra/http");
const AppEvents = require("./infra/AppEvents");

const UserRepo = require("./infra/UserRepo");
const UserService = require("./app/UserService");


(() => {

    const port = 3000; // TODO: Pull from config

    const appEvents = new AppEvents();

    // TODO: Real DB
    userRepo = new UserRepo([
        {id: 0, name: "Test0", balance: 100},
        {id: 1, name: "Test1", balance: 0},
        {id: 2, name: "Test2", balance: 10},
        {id: 3, name: "Test3", balance: 33},
    ]);

    const userService = new UserService(userRepo);
    userService.setupHandlers(appEvents);

    httpInfra = new HttpInfra(
        port, 
        appEvents,
    );

    httpInfra.run();

})();
