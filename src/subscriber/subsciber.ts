export default class Subsciber<T> {
    private _id: string;
    topic: string;

    get id(): string {
        return this._id;
    }
}