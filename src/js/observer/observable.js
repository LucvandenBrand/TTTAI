export default class Observable {
    constructor() {
        this._observers = [];
    }

    subscribe(observer) {
        this._observers.push(observer);
    }

    _notifyObservers() {
        this._observers.forEach(observer => observer.update());
    }
}