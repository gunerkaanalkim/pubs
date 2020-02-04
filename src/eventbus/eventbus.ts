import Publisher from "../publisher/publisher";
import Subsciber from "../subscriber/subsciber";

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

        if (this._bus.hasOwnProperty(topic)) {
            this._bus[topic] = {};
        }

        this._bus[publisher.topic] = {state: state, subscribers: {}};

        return this;
    }

    private _removePublisher(publisher: Publisher): Eventbus {
        const {topic} = publisher;

        if (this._bus.hasOwnProperty(topic)) {
            delete this._bus[topic];
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

    private _addSubscriber(subscriber: Subsciber): Eventbus {
        const {id, topic, callback} = subscriber;
        const state = this._bus[topic]["state"];

        if (Array.isArray(topic)) {
            return null;
        } else {
            if (this._bus.hasOwnProperty(topic)) {
                this._bus[topic]["subscribers"][id] = subscriber;

                this._fireSubscriber(subscriber, state, callback);
            }

            return this;
        }
    }

    private _removeSubscriber(subscriber: Subsciber): Eventbus {
        const {id, topic} = subscriber;

        if (this._bus.hasOwnProperty(topic)) {
            delete this._bus[topic]["subscribers"][id];
        }

        return this;
    }

    private _fireSubscriber(context: Subsciber, state: object, callback: Function): void {
        callback.call(context, state);
    }
}