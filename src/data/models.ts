import {Category, Gender} from "./category";
import {Color} from "@ionic/core";

export interface User {
    categories?: Category[];
    name?: string;
    age?: number;
    uid?: string;
    gender?: Gender;
    chats?: ChatFirebase;
    location?: Location
}

export interface Location {
    longitude: number;
    latitude: number;
}

export interface UserData {
    email: string,
    password: string,
}

export interface ChatFirebase {
    [key: string]: Message[];
}

export type ChatApp = Map<string, Message[]>;

export interface State {
    user?: User;
    users: User[];
    userData?: UserData;
    toast?: Toast;
    isProfileSetup: boolean;
    distance: number;
}

export interface IRootState {
    datasetSlice: State;
}

export interface Message {
    uid: string;
    value: string;
}

export type ToastPosition = "bottom" | "middle" | "top";

export interface Toast {
    message: string;
    duration?: number;
    position?: ToastPosition;
    color?: Color;
    isOpen?: boolean;
}