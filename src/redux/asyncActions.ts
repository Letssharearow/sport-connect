import {createAsyncThunk} from "@reduxjs/toolkit";
import {getDocument, getDocuments, login, saveDoc, setSingleDoc} from "../utils/firebaseConfig";
import {IRootState, Message, User} from "../data/models";
import {updateArray} from "../utils/functions";

export const fetchUsers = createAsyncThunk('users', async (args, {getState}) => {
    console.debug('fetchUser',);
    let documents = await getDocuments();
    console.debug('documents', documents);
    return documents;
});

export const fetchUser = createAsyncThunk('user', async (uid: string, {getState}) => {
    console.debug('fetchUser',);
    let document = await getDocument(uid);
    console.debug('documents', document);
    return document as User;
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
            await setSingleDoc(from.uid, {
                ...from,
                chats: from.chats ? updateArray(from.chats, chatFrom, 'userId') : [chatFrom]
            } as User)
            const chatTo = {userId: from.uid, messages};
            await setSingleDoc(to.uid, {
                ...to,
                chats: to.chats ? updateArray(to.chats, chatTo, 'userId') : [chatTo]
            } as User)
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