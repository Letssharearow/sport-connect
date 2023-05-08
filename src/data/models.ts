import {Category, Gender} from "./category";

export interface User {
    categories?: Category[];
    name?: string;
    age?: number;
    description?: string;
    id?: number;
    gender?: Gender;
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

export interface IRootState {
    datasetSlice: State;
}

export interface Message {
    isFromMe: boolean;
    value: string;
}