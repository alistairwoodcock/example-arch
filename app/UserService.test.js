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

    beforeEach(() => {
        repo = new MockUserRepo();
        repo.users = [{id: 0, name: "A", balance: 10}, {id: 1, name: "B", balance: 0}];
        userService = new UserService(repo);
    })
    
    test("Gets all users", () => {
        expect(userService.getUsers()).toEqual(repo.users);
    })

    test("Pays user", () => {
        
        userService.makePayment(0, 1, 10);

        let userA = repo.getUserById(0);
        let userB = repo.getUserById(1);

        expect(userA.balance).toEqual(0);
        expect(userB.balance).toEqual(10);
    });

    test("Cannot pays user more than balance", () => {
        
        let result = userService.makePayment(0, 1, 20);

        let userA = repo.getUserById(0);
        let userB = repo.getUserById(1);

        expect(result).toEqual(false);
        expect(userA.balance).toEqual(10);
    });

    test("Cannot pay nonexistent user", () => {
        let result = userService.makePayment(0, -1, 10);

        let userA = repo.getUserById(0);

        expect(result).toEqual(false);
        expect(userA.balance).toEqual(10);
    });

    test("Cannot pay from nonexistent user", () => {
        let result = userService.makePayment(-1, 1, 10);

        let userB = repo.getUserById(1);

        expect(result).toEqual(false);
        expect(userB.balance).toEqual(0);
    });

    test("Cannot pay negative balance", () => {
        let result = userService.makePayment(0, 1, -10);

        let userB = repo.getUserById(1);

        expect(result).toEqual(false);
        expect(userB.balance).toEqual(0);
    });

    test("Cannot pay zero", () => {
        let result = userService.makePayment(0, 1, 0);
        expect(result).toEqual(false);
    })

    test("Connect pay to and from same user", () => {
        let result = userService.makePayment(0, 1, 0);        
        expect(result).toEqual(false);
    })

});

