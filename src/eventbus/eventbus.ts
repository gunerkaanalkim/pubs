import Publisher from "../publisher/publisher";

export default class Eventbus<P, S> {
    private _publishers: Array<P> = [];
    private _subscribers: Array<S> = [];
    private _mapper: Array<P | Array<S>>;
    public publisher = {
        add: this._addPublisher.bind(this),
        remove: this._removePublisher.bind(this)
    };

    private _addPublisher(publisher: P): Eventbus<P, any> {
        this._publishers.push(publisher);

        return this;
    }

    private _removePublisher(publisher: P): Eventbus<P, any> {
        const idx = this._publishers.indexOf(publisher);

        if (idx !== -1) {
            this._publishers.splice(idx, 1)
        }

        return this;
    }

    public getTopics(): Array<P> {
        let topics: Array<string> = [];

/*
        this._publishers.forEach(pub => topics.push(pub.topic))
*/

        return [];
    }

    get publishers(): Array<P> {
        return this._publishers;
    }

    set publishers(value: Array<P>) {
        this._publishers = value;
    }
}