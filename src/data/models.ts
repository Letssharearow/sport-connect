import {Enums} from "./enums";

export interface User {
    categories: Enums[];
    name: string;
    age: number;
    description: string;
    id: number;
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