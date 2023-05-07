import {User} from "./models";
import {Category, Gender} from "./category";

const users: User[] = [{
    age: 20,
    name: "Julian",
    description: "Hi, ich will sport machen",
    categories: [Category.badminton, Category.volleyball, Category.running],
    id: 0,
    gender: Gender.male,
}, {
    age: 20,
    name: "Philipp",
    description: "Hi, ich will sport machen",
    categories: [Category.badminton, Category.volleyball, Category.running],
    id: 1,
    gender: Gender.male,
}, {
    age: 20,
    name: "Niemand",
    description: "Hi, ich will sport machen",
    categories: [Category.badminton, Category.volleyball, Category.running],
    id: 2,
    gender: Gender.male,
}, {
    age: 20,
    name: "Dieser",
    description: "Hi, ich will sport machen",
    categories: [Category.badminton, Category.volleyball, Category.running],
    id: 3,
    gender: Gender.male,
}, {
    age: 20,
    name: "Julian",
    description: "Hi, ich will sport machen",
    categories: [Category.badminton, Category.volleyball, Category.running],
    id: 4,
    gender: Gender.male,
},]

export const getUsers = () => users;
export const getUser = (id: number) => users.find(m => m.id === id);
