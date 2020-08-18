/**
 * Object which can be observed by an Observer.
 */
export default class Observable {
    /**
     * Initializes the Observable.
     */
    constructor() {
        this._observers = [];
    }

    /**
     * Subscribe to the Observable for updates.
     * @param {Observer} observer The Observer that should get updates.
     */
    subscribe(observer) {
        this._observers.push(observer);
    }

    _notifyObservers() {
        this._observers.forEach(observer => observer.update());
    }
}