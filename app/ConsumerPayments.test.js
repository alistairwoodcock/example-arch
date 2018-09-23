const ConsumerPayments = require("./ConsumerPayments");

class MockUserRepo {

    constructor() {
        this.users = [];
    }

    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    getUsers() {
        return this.users;
    }
}

describe("User Payments", () => {

    let repo;
    let consumerPayments;

    let userA;
    let userB;

    beforeEach(() => {
        repo = new MockUserRepo();
        repo.users = [{id: 0, name: "A", balance: 10}, {id: 1, name: "B", balance: 0}];
        userA = repo.getUserById(0)
        userB = repo.getUserById(1)
        consumerPayments = new ConsumerPayments(repo);
    })
    
    test("Pays user", () => {
        
        consumerPayments.makePayment(userA, userB, 10);

        expect(userA.balance).toEqual(0);
        expect(userB.balance).toEqual(10);
    });

    test("Cannot pays user more than balance", () => {
        
        let [success, reason] = consumerPayments.makePayment(userA, userB, 20);

        expect(success).toEqual(false);
        expect(userA.balance).toEqual(10);
    });

    test("Cannot pay nonexistent user", () => {
        let [success, reason] = consumerPayments.makePayment(userA, undefined, 10);

        expect(success).toEqual(false);
        expect(userA.balance).toEqual(10);
    });

    test("Cannot pay from nonexistent user", () => {
        let [success, reason] = consumerPayments.makePayment(undefined, userB, 10);

        expect(success).toEqual(false);
        expect(userB.balance).toEqual(0);
    });

    test("Cannot pay negative balance", () => {
        let [success, reason] = consumerPayments.makePayment(userA, userB, -10);

        expect(success).toEqual(false);
        expect(userB.balance).toEqual(0);
    });

    test("Cannot pay zero", () => {
        let [success, reason] = consumerPayments.makePayment(userA, userB, 0);
        expect(success).toEqual(false);
    })

    test("Connect pay to and from same user", () => {
        let [success, reason] = consumerPayments.makePayment(userA, userB, 0);        
        expect(success).toEqual(false);
    })

});

