import Eventbus from "../eventbus/eventbus";

interface PublisherOption {
    topic: string;
    state?: any;
}

export default class Publisher {
    private _topic: string = undefined;
    private _state: any = undefined;
    private _eventbus: Eventbus = undefined;

    constructor(option?: PublisherOption) {
        this._topic = option?.topic;
        this._state = option?.state;
    }

    send(state: any): Publisher {
        this._state = state;

        return this;
    }

    get topic(): string {
        return this._topic;
    }

    set topic(value: string) {
        this._topic = value;
    }

    get state(): any {
        return this._state;
    }

    set state(value: any) {
        this._state = value;
    }


    get eventbus(): Eventbus {
        return this._eventbus;
    }

    set eventbus(value: Eventbus) {
        this._eventbus = value;
    }
}