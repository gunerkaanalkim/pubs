import Publisher from "../../src/publisher/publisher";
import Eventbus from "../../src/eventbus/eventbus";

describe("Publisher's Unit Tests", () => {
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

    });
});