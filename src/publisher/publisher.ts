import Eventbus from '../eventbus/eventbus';
import Subsciber from '../subscriber/subsciber';

interface PublisherOption {
  topic: string;
  state: any;
}

export default class Publisher {
  private readonly _topic: string;
  private _state: any = undefined;
  private _eventbus?: Eventbus;

  constructor(option: PublisherOption) {
    this._topic = option.topic;
    this._state = option.state;
  }

  send(state: any): Publisher {
    this._state = state;

    const subscibers: any = this._eventbus?.getSubscribersByTopic(this._topic);
    this._processAndFireSubscribers(subscibers, state);

    return this;
  }

  get topic(): string {
    return this._topic;
  }

  get state(): any {
    return this._state;
  }

  get eventbus(): Eventbus {
    return this._eventbus!;
  }

  set eventbus(value: Eventbus) {
    this._eventbus = value;
  }

  private _processAndFireSubscribers(subscibers: Subsciber[], state: any) {
    for (const idx in subscibers) {
      if (subscibers.hasOwnProperty(idx)) {
        const subscriber = subscibers[idx];
        const { callback } = subscriber;

        this._fireSubscriber(subscriber, state, callback);
      }
    }
  }

  private _fireSubscriber(context: Subsciber, state: object, callback: any): void {
    callback.call(context, state);
  }
}
