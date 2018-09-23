const fs = require('fs');

class EventStore {
    
    constructor(filePath) {
        this.filePath = filePath;
        this.events = [];
    }

    store(data) {
        this.events.push(data);
        fs.writeFile(this.filePath, JSON.stringify(this.events), 'utf8', () => {});
    }
}

module.exports = EventStore;