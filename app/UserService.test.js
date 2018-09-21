const UserService = require("./UserService");

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
    let userService;

    let userA;
    let userB;

    beforeEach(() => {
        repo = new MockUserRepo();
        repo.users = [{id: 0, name: "A", balance: 10}, {id: 1, name: "B", balance: 0}];
        userA = repo.getUserById(0)
        userB = repo.getUserById(1)
        userService = new UserService(repo);
    })
    
    test("Gets all users", () => {
        expect(userService.getUsers()).toEqual(repo.users);
    })

    test("Pays user", () => {
        
        userService.makePayment(userA, userB, 10);

        expect(userA.balance).toEqual(0);
        expect(userB.balance).toEqual(10);
    });

    test("Cannot pays user more than balance", () => {
        
        let [success, reason] = userService.makePayment(userA, userB, 20);

        expect(success).toEqual(false);
        expect(userA.balance).toEqual(10);
    });

    test("Cannot pay nonexistent user", () => {
        let [success, reason] = userService.makePayment(userA, undefined, 10);

        expect(success).toEqual(false);
        expect(userA.balance).toEqual(10);
    });

    test("Cannot pay from nonexistent user", () => {
        let [success, reason] = userService.makePayment(undefined, userB, 10);

        expect(success).toEqual(false);
        expect(userB.balance).toEqual(0);
    });

    test("Cannot pay negative balance", () => {
        let [success, reason] = userService.makePayment(userA, userB, -10);

        expect(success).toEqual(false);
        expect(userB.balance).toEqual(0);
    });

    test("Cannot pay zero", () => {
        let [success, reason] = userService.makePayment(userA, userB, 0);
        expect(success).toEqual(false);
    })

    test("Connect pay to and from same user", () => {
        let [success, reason] = userService.makePayment(userA, userB, 0);        
        expect(success).toEqual(false);
    })

});

