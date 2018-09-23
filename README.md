### Exploring Hex/Event Arch

#### Structure
    index -- setup application and infrastructure

    app/ -- application logic + business rules

    infra/ -- infrastructure such as Databases, Http endpoints and Event Bus


Get list of users by making request:
    
    curl localhost:3000/users

Make payment from one user to the other with:

    curl localhost:3000/pay -X POST -H "Content-Type: application/json" -d '{"from":0, "to":1, "amount": -20}'

Run with:
	npm start

Run tests with:
	npm test


These are the concepts I'm following for this idea, although not perfectly:
* [boundaries](https://www.destroyallsoftware.com/talks/boundaries)
* [Hexagonal Arch - Alistair Cockburn](https://web.archive.org/web/20180822100852/http://alistair.cockburn.us/Hexagonal+architecture)
* [Hexagonal Arch - Ian Cooper](https://www.youtube.com/watch?v=FJUevNLEtuU)


