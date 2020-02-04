import Publisher from "../publisher/publisher";
import Subsciber from "../subscriber/subsciber";

export default class Eventbus {
    private _publishers: Array<Publisher> = [];
    private _subscribers: Array<Subsciber> = [];
    private _mapper: Array<Publisher | Array<Subsciber>>;

    public publisher = {
        add: this._addPublisher.bind(this),
        remove: this._removePublisher.bind(this)
    };

    public subscriber = {
        add: this._addSubscriber.bind(this),
        size: this._subscribersLength.bind(this),
        isEmpty: this._subscribersIsEmpty.bind(this),
        remove: this._removeSubscriber.bind(this)
    };

    private _addPublisher(publisher: Publisher): Eventbus {
        this._publishers.push(publisher);

        return this;
    }

    private _removePublisher(publisher: Publisher): Eventbus {
        const idx = this._publishers.indexOf(publisher);

        if (idx !== -1) {
            this._publishers.splice(idx, 1)
        }

        return this;
    }

    private _addSubscriber(subscriber: Subsciber): Eventbus {
        this._subscribers.push(subscriber);

        return this;
    }

    private _removeSubscriber(subscriber: Subsciber): Eventbus {
        const idx = this._subscribers.indexOf(subscriber);

        if (idx !== -1) {
            this._subscribers.splice(idx, 1)
        }

        return this;
    }

    private _subscribersIsEmpty(): boolean {
        return this._subscribers.length === 0;
    }

    private _subscribersLength(): number {
        return this._subscribers.length;
    }

    public getTopics(): Array<string> {
        return this._publishers.map(pub => pub.topic);
    }

    get publishers(): Array<Publisher> {
        return this._publishers;
    }

    set publishers(value: Array<Publisher>) {
        this._publishers = value;
    }
}