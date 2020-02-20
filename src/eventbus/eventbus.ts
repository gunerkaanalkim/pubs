import Publisher from "../publisher/publisher";
import Subsciber from "../subscriber/subsciber";
import BusKeys from "../constant/BusKeys";
import Dialogs from "../constant/Dialogs";

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
        this._setEventbusToPublisher(publisher, this._bus);

        return this;
    }

    private _removePublisher(publisher: Publisher): Eventbus {
        const {topic} = publisher;

        this._resetTopicIfExist(topic);

        return this;
    }

    private _addSubscriber(subscriber: Subsciber): Eventbus {
        const {id, topic, callback} = subscriber;

        if (this._topicHasSameSubscriber(topic, subscriber)) {
            throw new Error(Dialogs.Errors.SAME_SUBSCRIBER);
        }

        const state = this._getStateByTopic(topic);

        this._addSubscriberToPublisher(topic, id, subscriber);
        this._setEventbusToSubscriber(subscriber, this._bus);
        this._fireSubscriber(subscriber, state, callback);

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

    private _topicHasSameSubscriber(topic, subsciber: Subsciber) {
        let has = false;

        if (Array.isArray(topic)) {
            for (let tpc of topic) {
                if (this._hasTopic(tpc)) {
                    has = this._bus[tpc][BusKeys.SUBSCRIBERS].hasOwnProperty(subsciber.id);
                }
            }
        } else {
            if (this._hasTopic(topic)) {
                has = this._bus[topic][BusKeys.SUBSCRIBERS].hasOwnProperty(subsciber.id);
            }
        }

        return has;
    }

    /**
     * Mutators
     * **/
    private _resetTopicIfExist(topic: string) {
        if (this._bus.hasOwnProperty(topic)) {
            delete this._bus[topic];
        }
    }

    private _publishToBus(topic: string, state: object, subscribers: object): void {
        this._bus[topic] = {state: state, subscribers: subscribers};
    }

    private _getStateByTopic(topic: any): any {
        if (Array.isArray(topic)) {
            let states = {};

            for (let tp of topic) {
                if (this._hasTopic(tp)) {
                    states[tp] = this._bus[tp][BusKeys.STATE];
                }
            }

            return states;
        } else {
            if (this._hasTopic(topic)) {
                return this._bus[topic][BusKeys.STATE]
            }
        }
    }

    private _addSubscriberToPublisher(topic: string, id: string, subscriber: object): void {
        if (Array.isArray(topic)) {
            for (let tp of topic) {
                if (this._hasTopic(tp)) {
                    this._bus[tp][BusKeys.SUBSCRIBERS][id] = subscriber;
                }
            }
        } else {
            if (this._hasTopic(topic)) {
                this._bus[topic][BusKeys.SUBSCRIBERS][id] = subscriber;
            }
        }
    }

    private _hasTopic(topic: string): boolean {
        if (this._bus.hasOwnProperty(topic)) {
            return true;
        } else {
            throw new Error(Dialogs.Errors.TOPIC_NOT_FOUND);
        }
    }

    private _resetSubscriberIfExist(topic: string, id: string) {
        delete this._bus[topic][BusKeys.SUBSCRIBERS][id];
    }

    private _setEventbusToPublisher(publisher: Publisher, bus: object): Publisher {
        publisher.eventbus = this;

        return publisher;
    }

    private _setEventbusToSubscriber(subscriber: Subsciber, bus: object): Subsciber {
        subscriber.eventbus = this;

        return subscriber;
    }
}