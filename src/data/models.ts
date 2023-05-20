import {Category, Gender} from "./category";
import {Color} from "@ionic/core";

export interface User {
    categories?: Category[];
    name?: string;
    age?: number;
    description?: string;
    uid?: string;
    gender?: Gender;
    chats?: Chat[];
}

export interface UserData {
    email: string,
    password: string,
}

export interface Chat {
    userId: string;
    messages: Message[];
}

export interface State {
    user?: User;
    users: User[];
    userData?: UserData;
    toast?: Toast;
    isProfileSetup: boolean;
}

export interface IRootState {
    datasetSlice: State;
}

export interface Message {
    uid: string;
    value: string;
}

export type Position = "bottom" | "middle" | "top";

export interface Toast {
    message: string;
    duration?: number;
    position?: Position;
    color?: Color;
    isOpen?: boolean;
}