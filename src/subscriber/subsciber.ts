import Eventbus from "../eventbus/eventbus";

interface SubscriberOption {
    id: string;
    topic: any,
    callback: Function
}

export default class Subsciber {
    private _id: string;
    private _topic: any;
    private _callback: Function;
    private _eventbus: Eventbus = undefined;

    constructor(option?: SubscriberOption) {
        this._id = option?.id;
        this._topic = option?.topic;
        this._callback = option?.callback;
    }


    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get topic(): string {
        return this._topic;
    }

    set topic(value: string) {
        this._topic = value;
    }

    get callback(): Function {
        return this._callback;
    }

    set callback(value: Function) {
        this._callback = value;
    }

    get eventbus(): Eventbus {
        return this._eventbus;
    }

    set eventbus(value: Eventbus) {
        this._eventbus = value;
    }
}