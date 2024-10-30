export class EventHandler {
    /**
     * A map to store event listeners.
     * @type {Map<string, Set<Function>>}
     */
    static events = new Map();

    /**
     * Registers a listener for a specific event.
     * @param {string} event - The name of the event.
     * @param {Function} listener - The callback function to be executed when the event is emitted.
     */
    static on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }

    /**
     * Unregisters a listener for a specific event.
     * @param {string} event - The name of the event.
     * @param {Function} listener - The callback function to be removed.
     */
    static off(event, listener) {
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.delete(listener);
            if (listeners.size === 0) {
                this.events.delete(event);
            }
        }
    }

    /**
     * Emits an event, calling all registered listeners with the provided arguments.
     * @param {string} event - The name of the event.
     * @param {{}} data - The arguments to pass to the listeners.
     */
    static emit(event, data) {
        const listeners = this.events.get(event);
        if (!listeners) return;

        for (const listener of listeners) {
            try {
                listener(data);
            } catch (error) {
                console.error(`Error in listener for event "${event}":`, error);
            }
        }
    }
}
