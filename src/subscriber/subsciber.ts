interface SubscriberOption {
    id: string;
    topic: string,
    callback: Function
}

export default class Subsciber {
    private _id: string;
    private _topic: string;
    private _callback: Function;

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
}