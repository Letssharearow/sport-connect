import {createAsyncThunk} from "@reduxjs/toolkit";
import {getDocument, getDocuments, login, setSingleDoc} from "../utils/firebaseConfig";
import {ChatFirebase, Message, User} from "../data/models";
import {Endpoint} from "../data/category";
import {debug} from "../data/constantValues";

export const fetchUsers = createAsyncThunk('users', async (args, {getState}) => {
    if (debug) console.debug('fetchUser',);
    let documents = await getDocuments(Endpoint.users);
    if (debug) console.debug('documents', documents);
    return documents;
});

export const fetchUser = createAsyncThunk('user', async (uid: string, {getState}) => {
    if (debug) console.debug('fetchUser',);
    let document = await getDocument(Endpoint.users, uid);
    if (debug) console.debug('documents', document);
    return document as User;
});

export const writeUser = createAsyncThunk('user/write', async (user: User, {getState}) => {
    if (debug) console.debug('user/write',);
    if (user.uid) {
        let document = await setSingleDoc(Endpoint.users, user.uid, user);
        if (debug) console.debug('documents', document);
    }
});

export const fetchChatsFromUser = createAsyncThunk('user/chats', async (uid: string, {getState}) => {
    if (debug) console.debug('fetchChatsFromUser',);
    let document = await getDocument(Endpoint.chats, uid);
    if (debug) console.debug('documents', document);
    return document?.chats as ChatFirebase;
});

export const sendMessage = createAsyncThunk('user/message', async ({
                                                                       messages,
                                                                       from,
                                                                       to
                                                                   }: { messages: Message[], from: User, to: User }, {getState}) => {

    if (debug) console.debug('user/message');
    if (from && to && from.uid && to.uid && messages && messages.length > 0) {
        if (debug) console.debug('sending message', messages, from, to);
        try {
            const map = new Map();
            map.set(to.uid, messages);
            const mapTo = new Map();
            mapTo.set(from.uid, messages);
            const chats = Object.fromEntries(map);
            console.log('chats', chats);
            await setSingleDoc(Endpoint.chats, from.uid, {chats: chats}, true)
            await setSingleDoc(Endpoint.chats, to.uid, {chats: Object.fromEntries(mapTo)}, true)
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

    if (debug) console.debug('user/login');
    try {
        return await login(email + "", password + "");
    } catch (e) {
        throw(e);
    }

});