const EventEmitter = require('events');


class AppEvents extends EventEmitter {

    constructor(eventStore) {
        super();
        this.eventStore = eventStore;
    }

    execute(taskFunc) {
        taskFunc();
    }

    on(eventName, func) {
        if(!this.eventMap) {
            this.eventMap = {};
        }

        this.eventMap[eventName] = func;
    }

    command(eventName, data) {
        console.log('COMMAND: ', eventName, data);
        this.eventStore.store({type: 'COMMAND', time: new Date(), name: eventName, data});
        return this.call(eventName, data);
    }

    query(eventName, data) {
        console.log('QUERY: ', eventName, data);
        this.eventStore.store({type: 'QUERY', time: new Date(), name: eventName, data});
        return this.call(eventName, data);
    }

    call(eventName, data) {
        let func = this.eventMap[eventName];
        let res = null;

        try {
            res = func(data); 
        } catch (error) {
            return res;
        }

        return res;
    }

}

module.exports = AppEvents;