<p align="center">
    <a href="https://circleci.com/gh/gunerkaanalkim/pubs/tree/dev"><img src="https://circleci.com/gh/gunerkaanalkim/pubs.svg?style=shield" alt="Build Status"></a>
    <a href="https://codecov.io/gh/gunerkaanalkim/pub-sub"><img src="https://codecov.io/gh/gunerkaanalkim/pub-sub/branch/master/graph/badge.svg" /></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green.svg"/></a>
    <a href="https://github.com/gunerkaanalkim/pubs/issues"><img src="https://img.shields.io/github/issues/gunerkaanalkim/pubs?color=red"/></a>
    <a href="https://www.npmjs.com/package/pubs-js"><img src="https://img.shields.io/github/issues-closed/gunerkaanalkim/pubs?color=green"/></a>
    <a href="https://www.npmjs.com/package/pubs-js"><img src="https://img.shields.io/npm/v/pubs-js.svg?color=yellow"/></a>
</p>

<h2 align="center">Index</h2>

<ul>
    <li>
        <a href="#introduction">Introduction</a>
    </li>
    <li> 
        <a href="#publisher-at-a-glance">Publisher at a glance</a> 
        <ul>
            <li><a href="#publishers-api">Publisher's API</a></li>
        </ul>
    </li>
    <li> 
        <a href="#subscriber-at-a-glance">Subscriber at a glance</a> 
        <ul>
            <li><a href="#subscribers-api">Subscribers's API</a></li>
        </ul>
    </li>
    <li> 
        <a href="#eventbus-at-a-glance">Eventbus at a glance</a> 
        <ul>
            <li><a href="#publisher-object">Publisher Object</a></li>
            <li><a href="#subscriber-object">Subscriber Object</a></li>
            <li><a href="#eventbus-api">Eventbus's API</a></li>
        </ul>
    </li>
    <li>
        <a href="#a-complete-example">A Complete Example</a>
    </li>
    <li>
            <a href="#with-react">With React</a>
    </li>
    <li>
            <a href="#with-vue">With Vue</a>
    </li>
    <li>
            <a href="#with-angular">With Angular</a>
    </li>
</ul>

---

<h2 align="center" id="introduction">Introduction</h2>
Pubs basically consists of three parts; Eventbus, Publisher and Subscriber.
Eventbus stores `topic` and `state`. 
Publisher is message sender for Eventbus that can send any type of message; string, array, number etc.
Subscriber is message sink for Eventbust that subscribes to messages sent with the help of a callback method.

<h2 align="center" id="publisher-at-a-glance">Publisher at a glance </h2>
Publisher publish a state object to eventbus with its `constructor` and `send` method.

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
<h2 id="publishers-api">Publisher's API</h2>

| Name            | Type                          | Description                  |
|-----------------|-------------------------------|------------------------------|
| topic           | string                        | none                         |
| state           | any                           | none                         |


---

<h2 align="center" id="subscriber-at-a-glance">Subscriber at a glance </h2>
Subscribers listens to a `topic` on the `eventbus` using a `callback` method.
Subscriber initialize with constructor method.
Subscribers must have a unique `id` attribute.

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

Different subscribers can listen common topic on eventbus.

```typescript
let pub_1 = new Publisher({
    topic: "topic_1",
//...

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
```

<h2 id="subscribers-api">Subscribers's API</h2>
Coming soon

---

<h2 align="center" id="eventbus-at-a-glance">Eventbus at a glance </h2>
Eventbus stores `topic` and `state`. Eventbus initialize with contructor method.
Eventbus have two public object; `publisher` & `subscriber`

```typescript
let eventbus = new Eventbus();
```

<h3 id="publisher-object">Publisher Object</h3>

Publishers can register with add method of publisher object.

```typescript
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
```

<h3 id="subscriber-object">Subscriber Object</h3>

Subscribers can register with add method of eventbus.

```typescript
const eventbus = new Eventbus();

let sub_1 = new Subsciber({
    id: "sub_1",
    topic: "topic_1",
    callback: (state) => console.log(state)
});

let sub_2 = new Subsciber({
    id: "sub_2",
    topic: "topic_2",
    callback: (state) => console.log(state)
});

let sub_3 = new Subsciber({
    id: "sub_3",
    topic: ["topic_1", "topic_2"],
    callback: (state) => console.log(state)
});

eventbus.subscriber.add(sub_1);
eventbus.subscriber.add(sub_2);
eventbus.subscriber.add(sub_3);
```

<h2 id="eventbus-api">Eventbus's API</h2>
Coming soon

---

<h2 align="center" id="a-complete-example">A Complete Example</h2>
Coming soon

<h2 align="center" id="with-react">With React</h2>
Coming soon

<h2 align="center" id="with-vue">With Vue</h2>
Coming soon

<h2 align="center" id="with-angular">With Angular</h2>
Coming soon