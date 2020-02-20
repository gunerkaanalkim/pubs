import Publisher from "../../src/publisher/publisher";
import Subsciber from "../../src/subscriber/subsciber";
import Eventbus from "../../src/eventbus/eventbus";

describe("Publisher's Unit Tests", () => {
    it("should be initialized with constructor", () => {
        let pub = new Publisher({
            topic: "topic_1",
            state: {
                name: "Patrick",
                surname: "Swayze",
                message: "R.I.P"
            }
        });

        const topicName = pub.topic;
        const state = pub.state;

        expect(topicName).toBe("topic_1");
        expect(state).toStrictEqual({
            name: "Patrick",
            surname: "Swayze",
            message: "R.I.P"
        });
    });

    it("Publisher's setter/getter methods for state and topics.", () => {
        let pub = new Publisher({
            topic: "topic_2",
            state: {
                name: "Patrick",
                surname: "Swayze",
                filmograpgy: ["Ghost"]
            }
        });

        const topicName = pub.topic;
        const state = pub.state;

        expect(topicName).toBe("topic_2");
        expect(state).toStrictEqual({
            name: "Patrick",
            surname: "Swayze",
            filmograpgy: ["Ghost"]
        });
    });

    it("should send a state object with Publisher's send method.", () => {
        let pub = new Publisher({
            topic: "topic_2",
            state: {
                name: "Patrick",
                surname: "Swayze",
                filmography: ["Ghost"]
            }

        });

        const topicName = pub.topic;
        const state = pub.state;

        expect(topicName).toBe("topic_2");
        expect(state).toStrictEqual({
            name: "Patrick",
            surname: "Swayze",
            filmography: ["Ghost"]
        });
    });

    it("should fire subscribers of publisher with send() method", () => {
        let eventbus = new Eventbus();

        let pub = new Publisher({
            topic: "topic_X",
            state: {}
        });

        eventbus.publisher.add(pub);

        let sub_1 = new Subsciber({
            id: "sub_1",
            topic: ["topic_X"],
            callback: (state) => {
                console.log("It's sub_1");
            }
        });

        let sub_2 = new Subsciber({
            id: "sub_2",
            topic: ["topic_X"],
            callback: (state) => {
                console.log("It's sub_2");
            }
        });

        [sub_1, sub_2].forEach(sub => eventbus.subscriber.add(sub));

        pub.send({
            name: "Patrick",
            surname: "Swayze",
            filmography: ["Ghost"]
        });
    });


    it("should get eventbus object", () => {
        let eventbus = new Eventbus();

        let pub = new Publisher({
            topic: "topic_X",
            state: {}
        });

        eventbus.publisher.add(pub);

        expect(pub.eventbus).toStrictEqual(eventbus);

    });
});