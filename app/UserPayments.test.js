const UserPayments = require("./UserPayments");

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

    saveUser(user) {
        this.users = this.users.map(u => {
            if(user.id !== u.id) return u;
            return user;
        });
    }
}

describe("User Payments", () => {

    let repo;
    let userPayments;

    let userA;
    let userB;

    beforeEach(() => {
        repo = new MockUserRepo();
        repo.users = [{id: 0, name: "A", balance: 10}, {id: 1, name: "B", balance: 0}];
        userA = repo.getUserById(0)
        userB = repo.getUserById(1)
        userPayments = new UserPayments(repo);
    })
    
    test("Succesfully pays user", () => {
        
        let {success, reason} = userPayments.transferMoney(userA.id, userB.id, 10);

        expect(success).toEqual(true);

        userA = repo.getUserById(userA.id)
        userB = repo.getUserById(userB.id)

        expect(userA.balance).toEqual(0);
        expect(userB.balance).toEqual(10);
    });

    test("Cannot pays user more than balance", () => {
        
        let {success, reason} = userPayments.transferMoney(userA.id, userB.id, 20);

        userA = repo.getUserById(userA.id)

        expect(success).toEqual(false);
        expect(userA.balance).toEqual(10);
    });

    test("Cannot pay nonexistent user", () => {
        let {success, reason} = userPayments.transferMoney(userA.id, undefined, 10);

        userA = repo.getUserById(userA.id)
        
        expect(success).toEqual(false);
        expect(userA.balance).toEqual(10);
    });

    test("Cannot pay from nonexistent user", () => {
        let {success, reason} = userPayments.transferMoney(undefined, userB, 10);

        userB = repo.getUserById(userB.id)

        expect(success).toEqual(false);
        expect(userB.balance).toEqual(0);
    });

    test("Cannot pay negative balance", () => {
        let {success, reason} = userPayments.transferMoney(userA.id, userB.id, -10);

        userB = repo.getUserById(userB.id)

        expect(success).toEqual(false);
        expect(userB.balance).toEqual(0);
    });

    test("Cannot pay zero", () => {
        let {success, reason} = userPayments.transferMoney(userA.id, userB.id, 0);
        expect(success).toEqual(false);
    })

    test("Connect pay to and from same user", () => {
        let {success, reason} = userPayments.transferMoney(userA.id, userB.id, 0);        
        expect(success).toEqual(false);
    })

});

