const UserDetails = require("./UserDetails");

// TODO: Pull these mocks out as common repo mocks
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

    createUser(name, balance) {
        let found = this.users.find(u => u.name === name);

        if(found) return false;

        this.users.push({
            id: this.users.length,
            name,
            balance,
        });

        return true;
    }
}

describe("User Payments", () => {

    let repo;
    let userDetails;

    beforeEach(() => {
        repo = new MockUserRepo();
        repo.users = [{id: 0, name: "A", balance: 10}, {id: 1, name: "B", balance: 0}];
        userDetails = new UserDetails(repo);
    })
    
    test("Gets all users", () => {
        expect(userDetails.getUsers()).toEqual(repo.users);
    })

    test("Cannot create user with duplicate name", () => {
        let {success, reason} = userDetails.createUser("A",1);

        expect(success).toEqual(false);
    })
});