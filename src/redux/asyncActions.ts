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
    if (debug) console.debug('user/write', user);
    if (user.uid) {
        const deleted = {...user}
        delete deleted['chats'];
        console.log('deleted', deleted);
        let document = await setSingleDoc(Endpoint.users, user.uid, deleted);
        if (debug) console.debug('documents', document);
    }
});

export const fetchChatsFromUser = createAsyncThunk('user/chats', async (uid: string, {getState}) => {
    if (debug) console.debug('fetchChatsFromUser', uid);
    let document = await getDocument(Endpoint.chats, uid);
    if (debug) console.debug('documents', document);
    return document?.chats as ChatFirebase;
});

const maximumMessageAmount = -20;
export const sendMessage = createAsyncThunk('user/message', async ({
                                                                       messages,
                                                                       from,
                                                                       to
                                                                   }: { messages: Message[], from: User, to: User }, {getState}) => {

    if (debug) console.debug('user/message', messages);
    if (from && to && from.uid && to.uid && messages && messages.length > 0) {
        if (debug) console.debug('sending message', messages, from, to);
        try {
            const lastXMessages = messages.slice(maximumMessageAmount);
            const map = new Map();
            map.set(to.uid, lastXMessages);
            const mapTo = new Map();
            mapTo.set(from.uid, lastXMessages);
            await setSingleDoc(Endpoint.chats, from.uid, {chats: Object.fromEntries(map)}, true)
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

    if (debug) console.debug('user/login', password, email);
    try {
        return await login(email + "", password + "");
    } catch (e) {
        throw(e);
    }

});