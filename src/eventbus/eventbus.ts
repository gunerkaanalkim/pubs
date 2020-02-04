export default class Eventbus<P, S> {
    private _publishers: Array<P> = [];
    private _subscribers: Array<S> = [];
    private _mapper: Array<P | Array<S>>;
    public publisher = {
        add: this._addPublisher.bind(this)
    };

    private _addPublisher(publisher: P): Eventbus<P, any> {
        this._publishers.push(publisher);

        return this;
    }

    get publishers(): Array<P> {
        return this._publishers;
    }

    set publishers(value: Array<P>) {
        this._publishers = value;
    }
}