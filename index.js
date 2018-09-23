const HttpInfra = require("./infra/http");
const AppEvents = require("./infra/AppEvents");

const UserRepo = require("./infra/UserRepo");
const ConsumerPayments = require("./app/ConsumerPayments");
const PaymentService = require("./infra/PaymentService");

const UserDetails = require("./app/UserDetails");


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

    const paymentService = new PaymentService(/*config etc.. passed in here*/);

    const userDetails = new UserDetails(userRepo);
    userDetails.setupCommandHandlers(appEvents);

    const consumerPayments = new ConsumerPayments(userRepo, paymentService);
    consumerPayments.setupCommandHandlers(appEvents);

    httpInfra = new HttpInfra(
        port, 
        appEvents,
    );

    httpInfra.run();

})();
