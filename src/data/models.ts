import {Category, Gender} from "./category";

export interface User {
    categories?: Category[];
    name?: string;
    age?: number;
    description?: string;
    uid?: string;
    gender?: Gender;
}

export interface UserData {
    email: string,
    password: string,
}

export interface Chat {
    userId: number;
    messages: Message[];
}

export interface State {
    user?: User;
    users: User[];
    chats: Chat[];
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