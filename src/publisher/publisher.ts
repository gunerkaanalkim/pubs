interface PublisherOption<T> {
    topic: string;
    state: T;
}

export default class Publisher<T> {
    private _topic: string = undefined;
    private _state: T = undefined;

    constructor(option?: PublisherOption<T>) {
        this._topic = option?.topic;
        this._state = option?.state;
    }

    send(state: T): Publisher<T> {
        this._state = state;

        return this;
    }

    get topic(): string {
        return this._topic;
    }

    set topic(value: string) {
        this._topic = value;
    }

    get state(): T {
        return this._state;
    }

    set state(value: T) {
        this._state = value;
    }
}