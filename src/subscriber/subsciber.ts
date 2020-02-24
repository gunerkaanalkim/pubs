import Eventbus from "../eventbus/eventbus";

interface SubscriberOption {
  id: string;
  topic: any;

  callback(state: object): void;
}

export default class Subsciber {
  private readonly _id: string;
  private readonly _topic: any;
  private readonly _callback: (state: object) => void;
  private _eventbus?: Eventbus;

  constructor(option: SubscriberOption) {
    this._id = option.id;
    this._topic = option.topic;
    this._callback = option.callback;
  }

  get id(): string {
    return this._id;
  }

  get topic(): string {
    return this._topic;
  }

  get callback(): any {
    return this._callback;
  }

  get eventbus(): Eventbus {
    return this._eventbus!;
  }

  set eventbus(value: Eventbus) {
    this._eventbus = value;
  }
}
