### Exploring Event Arch

#### Structure
    index -- setup application and infrastructure

    app/ -- application logic + business rules

    infra/ -- infrastructure such as Databases, Http endpoints and Event Bus


Get list of users by making request:
    
    curl localhost:3000/users

Make payment from one user to the other with:

    curl localhost:3000/pay -X POST -H "Content-Type: application/json" -d '{"from":0, "to":1, "amount": -20}'