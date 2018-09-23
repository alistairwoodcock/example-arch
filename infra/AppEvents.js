const EventEmitter = require('events');


class AppEvents extends EventEmitter {

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
        // this.emit(eventName, data);


        let func = this.eventMap[eventName];
        let res = null;

        try {
            res = func(data); 
        } catch (error) {
            return res;
        }

        return res;

    }

    // onCommand(eventName, func) {
    //     this.on(eventName, func);
    // }

    // onQuery(eventName, func) {

    //     if(!this.eventMap) {
    //         this.eventMap = {};
    //     }

    //     this.eventMap[eventName] = func;
    // }

    query(eventName, data) {
        console.log('QUERY: ', eventName, data);

        // this.emit(eventName, data);

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