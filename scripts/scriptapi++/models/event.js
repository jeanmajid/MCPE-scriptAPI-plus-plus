import { EventHandler } from "./eventHandler";

export class Event {
    constructor(id) {
        this.id = id;
    }

    subscribe(callback) {
        EventHandler.on(this.id, callback);
        return callback;
    }

    unsubscribe(callback) {
        EventHandler.off(this.id, callback);
    }

    call(data) {
        EventHandler.emit(this.id, data);
    }
}