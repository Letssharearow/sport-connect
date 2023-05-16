import {createAsyncThunk} from "@reduxjs/toolkit";
import {getDocument, getDocuments, login, setSingleDoc} from "../utils/firebaseConfig";
import {Chat, Message, User} from "../data/models";
import {updateArray} from "../utils/functions";
import {Endpoint} from "../data/enums";

export const fetchUsers = createAsyncThunk('users', async (args, {getState}) => {
    console.debug('fetchUser',);
    let documents = await getDocuments(Endpoint.users);
    console.debug('documents', documents);
    return documents;
});

export const fetchUser = createAsyncThunk('user', async (uid: string, {getState}) => {
    console.debug('fetchUser',);
    let document = await getDocument(Endpoint.users, uid);
    console.debug('documents', document);
    return document as User;
});

export const writeUser = createAsyncThunk('user/write', async (user: User, {getState}) => {
    console.debug('user/write',);
    if (user.uid) {
        let document = await setSingleDoc(Endpoint.users, user.uid, user);
        console.debug('documents', document);
    }
});

export const fetchChatsFromUser = createAsyncThunk('user/chats', async (uid: string, {getState}) => {
    console.debug('fetchChatsFromUser',);
    let document = await getDocument(Endpoint.chats, uid);
    console.debug('documents', document);
    return document as { chats: Chat[] };
});

export const sendMessage = createAsyncThunk('user/message', async ({
                                                                       messages,
                                                                       from,
                                                                       to
                                                                   }: { messages: Message[], from: User, to: User }, {getState}) => {

    console.debug('user/message');
    if (from && to && from.uid && to.uid && messages && messages.length > 0) {
        try {
            const chatFrom = {userId: to.uid, messages};
            await setSingleDoc(Endpoint.chats, from.uid, {chats: from.chats ? updateArray(from.chats, chatFrom, 'userId') : [chatFrom]})
            const chatTo = {userId: from.uid, messages};
            await setSingleDoc(Endpoint.chats, to.uid, {chats: to.chats ? updateArray(to.chats, chatTo, 'userId') : [chatTo]})
        } catch (e) {
            throw(e);
        }
    } else {
        throw({message: 'failed'})
    }
});

export const loginAction = createAsyncThunk('user/login', async ({
                                                                     password, email
                                                                 }: { email: string, password: string }, {getState}) => {

    console.debug('user/login');
    try {
        return await login(email, password);
    } catch (e) {
        throw(e);
    }

});