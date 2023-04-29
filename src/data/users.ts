import {User} from "./models";
import {Enums} from "./enums";

const users: User[] = [{
    age: 20,
    name: "Julian",
    description: "Hi, ich will sport machen",
    categories: [Enums.badminton, Enums.volleyball, Enums.running],
    id: 0,
}, {
    age: 20,
    name: "Philipp",
    description: "Hi, ich will sport machen",
    categories: [Enums.badminton, Enums.volleyball, Enums.running],
    id: 1,
}, {
    age: 20,
    name: "Niemand",
    description: "Hi, ich will sport machen",
    categories: [Enums.badminton, Enums.volleyball, Enums.running],
    id: 2,
}, {
    age: 20,
    name: "Dieser",
    description: "Hi, ich will sport machen",
    categories: [Enums.badminton, Enums.volleyball, Enums.running],
    id: 3,
}, {
    age: 20,
    name: "Julian",
    description: "Hi, ich will sport machen",
    categories: [Enums.badminton, Enums.volleyball, Enums.running],
    id: 4,
},]

export const getUser = () => users;
