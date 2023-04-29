import {Enums} from "./enums";

export interface User {
    categories: Enums[];
    name: string;
    age: number;
    description: string;
    id: number;
}

export interface State {
    user: User;
    lastPage: string;
    currentPage: string;
}