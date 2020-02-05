import Publisher from "../publisher/publisher";
import Subsciber from "../subscriber/subsciber";
import {BusKeys} from "../constant/BusKeys";

export default class Eventbus {
    private _bus = {};

    public publisher = {
        add: this._addPublisher.bind(this),
        remove: this._removePublisher.bind(this)
    };

    public subscriber = {
        add: this._addSubscriber.bind(this),
        remove: this._removeSubscriber.bind(this)
    };

    private _addPublisher(publisher: Publisher): Eventbus {
        const {topic, state} = publisher;

        this._resetTopicIfExist(topic);

        this._publishToBus(topic, state, {});

        return this;
    }

    private _removePublisher(publisher: Publisher): Eventbus {
        const {topic} = publisher;

        this._resetTopicIfExist(topic);

        return this;
    }

    private _addSubscriber(subscriber: Subsciber): Eventbus {
        const {id, topic, callback} = subscriber;
        const state = this._getStateByTopic(topic);

        if (Array.isArray(topic)) {
            return this;
        }

        if (this._hasTopic(topic)) {
            this._addSubscriberToPublisher(topic, id, subscriber);

            this._fireSubscriber(subscriber, state, callback);
        }

        return this;
    }

    private _removeSubscriber(subscriber: Subsciber): Eventbus {
        const {id, topic} = subscriber;

        if (this._hasTopic(topic)) {
            this._resetSubscriberIfExist(topic, id);
        }

        return this;
    }

    public getTopicNames(): Array<String> {
        return Object.keys(this._bus);
    }

    public getSubscribersByTopic(topic: string): Array<Subsciber> {
        return this._bus[topic].subscribers;
    }

    public getTopics(): object {
        return this._bus;
    }

    private _fireSubscriber(context: Subsciber, state: object, callback: Function): void {
        callback.call(context, state);
    }

    /**
     * Bus Mutators
     * **/

    private _resetTopicIfExist(topic: string) {
        if (this._bus.hasOwnProperty(topic)) {
            delete this._bus[topic];
        }
    }

    private _publishToBus(topic: string, state: object, subscribers: object): void {
        this._bus[topic] = {state: state, subscribers: subscribers};
    }

    private _getStateByTopic(topic: string): object {
        return this._bus[topic][BusKeys.STATE];
    }

    private _addSubscriberToPublisher(topic: string, id: string, subscriber: object): void {
        this._bus[topic][BusKeys.SUBSCRIBERS][id] = subscriber;
    }

    private _hasTopic(topic: string): boolean {
        return this._bus.hasOwnProperty(topic);
    }

    private _resetSubscriberIfExist(topic: string, id: string) {
        delete this._bus[topic][BusKeys.SUBSCRIBERS][id];
    }
}