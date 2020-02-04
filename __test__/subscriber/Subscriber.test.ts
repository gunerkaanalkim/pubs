import Subsciber from "../../src/subscriber/subsciber";

describe("Publisher's Unit Tests", () => {
    it("should be initialized with constructor", () => {
        let sub = new Subsciber({
            id: "sub_1",
            topic: "topic_1",
            callback: (state) => {
                console.log(state);
            }
        });

        expect(sub.id).toBe("sub_1");
        expect(sub.topic).toBe("topic_1");

        sub.id = "another_sub";
        sub.topic = "another_topic";

        expect(sub.id).toBe("another_sub");
        expect(sub.topic).toBe("another_topic");
    });
});