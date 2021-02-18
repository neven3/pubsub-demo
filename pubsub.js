class PubSub {
    constructor(events = {}) {
        this.events = events;
    }

    subscribe(eventName, callback) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    }

    unsubscribe(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
        }
    }

    publish(eventName, item) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(item);
            });
        }
    }
}

const pubsub = new PubSub();

export default pubsub;