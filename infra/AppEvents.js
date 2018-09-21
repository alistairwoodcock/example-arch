const EventEmitter = require('events');

class AppEvents extends EventEmitter {

    execute(taskFunc) {
        taskFunc();
    }

    command(eventName, data) {
        console.log('COMMAND: ', eventName, data);
        this.emit(eventName, data);
    }

    onCommand(eventName, func) {
        this.on(eventName, func);
    }

    onQuery(eventName, func) {

        if(!this.queryMap) {
            this.queryMap = {};
        }

        this.queryMap[eventName] = func;
    }

    query(eventName, data) {
        console.log('QUERY: ', eventName, data);

        let func = this.queryMap[eventName];
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