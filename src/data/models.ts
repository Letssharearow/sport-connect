import {Enums, Gender} from "./enums";

export interface User {
    categories: Enums[];
    name: string;
    age: number;
    description: string;
    id: number;
    gender: Gender;
}

export interface UserData {
    email: string,
    password: string,
}

export interface State {
    user?: User;
    userData?: UserData;
    lastPage: string;
    currentPage: string;
}