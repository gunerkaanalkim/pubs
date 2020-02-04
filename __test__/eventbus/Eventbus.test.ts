import Publisher from "../../src/publisher/publisher";
import Eventbus from "../../src/eventbus/eventbus";
import Subsciber from "../../src/subscriber/subsciber";

describe("Eventbus's Unit Tests", () => {
    it("should be initialized with constructor", () => {
        let pub = new Publisher({
            topic: "topic_1",
            state: {
                name: "Patrick",
                surname: "Swayze",
                filmography: ["Ghost"]
            }
        });

        let eventbus = new Eventbus().publisher.add(pub);

        let topics = eventbus.getTopics();

        expect(topics).toStrictEqual(["topic_1"]);

    });

    it("should be add & remove a publisher item from eventbus", () => {
        const eventbus = new Eventbus();

        let pub_1 = new Publisher({
            topic: "topic_1",
            state: {name: "Patrick Swayze"}
        });

        let pub_2 = new Publisher({
            topic: "topic_2",
            state: {name: "Demi Moore"}
        });

        let pub_3 = new Publisher({
            topic: "topic_3",
            state: {name: "Whoopi Goldberg"}
        });

        eventbus.publisher.add(pub_1);
        eventbus.publisher.add(pub_2);
        eventbus.publisher.add(pub_3);

        let topics = eventbus.getTopics();

        expect(topics).toStrictEqual(["topic_1", "topic_2", "topic_3"]);

        eventbus.publisher.remove(pub_2);

        topics = eventbus.getTopics();
        expect(topics).toStrictEqual(["topic_1", "topic_3"]);
    });

    it("should be add & remove a subsciber item from eventbus", () => {
        const eventbus = new Eventbus();

        let sub_1 = new Subsciber({
            id: "sub_1",
            topic: "topic_1",
            callback: (state) => {
                console.log(state);
            }
        });

        let isEmpty = eventbus.subscriber.isEmpty();
        let size = eventbus.subscriber.size();

        expect(isEmpty).toBe(true);
        expect(size).toBe(0);

        eventbus.subscriber.add(sub_1);

        isEmpty = eventbus.subscriber.isEmpty();
        size = eventbus.subscriber.size();

        expect(isEmpty).toBe(false);
        expect(size).toBe(1);
    });
});