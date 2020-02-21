<p align="center">
    <a href="https://circleci.com/gh/gunerkaanalkim/pubs/tree/dev"><img src="https://circleci.com/gh/gunerkaanalkim/pubs.svg?style=shield" alt="Build Status"></a>
    <a href="https://codecov.io/gh/gunerkaanalkim/pub-sub"><img src="https://codecov.io/gh/gunerkaanalkim/pub-sub/branch/master/graph/badge.svg" /></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green.svg"/></a>
    <a href="https://github.com/gunerkaanalkim/pubs/issues"><img src="https://img.shields.io/github/issues/gunerkaanalkim/pubs?color=red"/></a>
    <a href="https://www.npmjs.com/package/pubs-js"><img src="https://img.shields.io/github/issues-closed/gunerkaanalkim/pubs?color=green"/></a>
    <a href="https://www.npmjs.com/package/pubs-js"><img src="https://img.shields.io/npm/v/pubs-js.svg?color=yellow"/></a>
</p>

<h2 align="center">Introduction </h2>
Pubs basically consists of three parts; Eventbus, Publisher and Subscriber.
Eventbus stores `topic` and `state`. 
Publisher is message sender for Eventbus that can send any type of message; string, array, number etc.
Subscriber is message sink for Eventbust that subscribes to messages sent with the help of a callback method.

<h2 align="center">Publisher at a glance </h2>
Publisher publish a state object to eventbus with its `constructor and `send` method.

````typescript
let pub = new Publisher({
    topic: 'topic_1',
    state: {
        name: "Patrick",
        surname: "Swayze",
        message: "R.I.P"
    }
});
````

Topic and state attributes can change later with `setter` & `getter`

````typescript
let pub = new Publisher({
    topic: 'topic_1',
    state: {
        name: "Patrick",
        surname: "Swayze",
        message: "R.I.P"
    }
});

pub.topic = "another_topic"
pub.state = { foo: "bar" }

````
You can publish the state to the `eventbus` using the `send` method.

````typescript
let eventbus = new Eventbus();

let pub = new Publisher({
    topic: "topic_1",
    state: {}
});

eventbus.publisher.add(pub);

// Foo
// Bar
// Tar

pub.send({
    name: "Patrick",
    surname: "Swayze",
    filmography: ["Ghost"]
});
````

<h2 align="center">Subscriber at a glance </h2>
Subscribers listens to a `topic` on the `eventbus` using a `callback` method.
Subscriber initialize with constructor method.

````typescript
let sub = new Subsciber({
    id: "sub_1",
    topic: "topic_1",
    callback: (state) => {
        console.log(state);
    }
});
````

Subscribers can be listen multiple topic.

```typescript
let sub = new Subsciber({
    id: "sub_1",
    topic: ["topic_1", "topic_2", "topic_3"],
    callback: (state) => {
        console.log(state);
    }
});
```

<h2 align="center">Eventbus at a glance </h2>
Eventbus stores `topic` and `state`. Eventbus initialize with contructor method.

```typescript
let eventbus = new Eventbus();
```

Eventbus have two public object; `publisher` `subscriber`
<h3>Publisher Object</h2>
Publisher object registers a publisher on eventbus with `add` method.

```typescript
//let fooPublisher = new Publisher


```
