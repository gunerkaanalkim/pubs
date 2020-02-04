import Publisher from "../../src/publisher/publisher";

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
        interface Filmograpgy {
            name: string,
            surname: string,
            filmograpgy: Array<string>
        }

        let pub = new Publisher<Filmograpgy>();
        pub.topic = "topic_2";
        pub.state = {
            name: "Patrick",
            surname: "Swayze",
            filmograpgy: ["Ghost"]
        };

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
        interface Filmograpgy {
            name: string,
            surname: string,
            filmograpgy: Array<string>
        }

        let pub = new Publisher<Filmograpgy>();
        pub.topic = "topic_2";

        pub.send({
            name: "Patrick",
            surname: "Swayze",
            filmograpgy: ["Ghost"]
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
});