import Subsciber from "../../src/subscriber/subsciber";
import Eventbus from "../../src/eventbus/eventbus";
import Publisher from "../../src/publisher/publisher";

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
  });

  it("multiple subscription", () => {
    let eventbus = new Eventbus();

    let pub_1 = new Publisher({
      topic: "topic_1",
      state: {
        msg: "This is topic_1"
      }
    });

    let pub_2 = new Publisher({
      topic: "topic_2",
      state: {
        msg: "This is topic_2"
      }
    });

    let pub_3 = new Publisher({
      topic: "topic_3",
      state: {
        msg: "This is topic_3"
      }
    });

    [pub_1, pub_2, pub_3].forEach(pub => eventbus.publisher.add(pub));

    let sub = new Subsciber({
      id: "sub_1",
      topic: ["topic_1", "topic_2", "topic_3"],
      callback: (state) => {
        console.log(state);
      }
    });

    eventbus.subscriber.add(sub);

  });

  it("common subscription", () => {
    let eventbus = new Eventbus();

    let pub_1 = new Publisher({
      topic: "topic_1",
      state: {
        msg: "This is topic_1"
      }
    });

    eventbus.publisher.add(pub_1);

    let sub_1 = new Subsciber({
      id: "sub_1",
      topic: ["topic_1"],
      callback: (state) => {
        console.log("It's sub_1");
      }
    });

    let sub_2 = new Subsciber({
      id: "sub_2",
      topic: ["topic_1"],
      callback: (state) => {
        console.log("It's sub_2");
      }
    });

    [sub_1, sub_2].forEach(sub => eventbus.subscriber.add(sub));

  });

  it("should get eventbus object", () => {
    let eventbus = new Eventbus();

    let pub_1 = new Publisher({
      topic: "topic_1",
      state: {
        msg: "This is topic_1"
      }
    });

    eventbus.publisher.add(pub_1);

    let sub_1 = new Subsciber({
      id: "sub_1",
      topic: ["topic_1"],
      callback: (state: any) => {
        console.log("It's sub_1");
      }
    });

    eventbus.subscriber.add(sub_1);

    expect(sub_1.eventbus).toStrictEqual(eventbus);
  });
});