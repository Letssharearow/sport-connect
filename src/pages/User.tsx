import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    IonToolbar,
    IonList,
    IonButton,
    IonFooter,
    IonTextarea,
    IonButtons,
    IonFabButton,
    IonIcon,
    IonRouterLink,
    IonContent,
    IonItem,
    IonText,
    IonInput, IonGrid, IonRow, IonCol
} from '@ionic/react';
import {useParams} from "react-router";

import {User as UserInterface, Message as MessageInterface, IRootState} from "../data/models"
import Message from "../components/Message";
import UserAttributes from "../components/UserAttributes";
import {useDispatch, useSelector} from "react-redux";
import {fetchChatsFromUser, fetchUser, sendMessage} from "../redux/asyncActions";
import {AppDispatch} from "../index";
import {refreshOutline, sendOutline} from "ionicons/icons";
import {isDispatchFulfilled} from "../utils/functions";
import {Page} from "../data/category";

const defaultMessage = "Hey, lust zusammen Sport zu machen?";
const User = () => {

    const users = useSelector((state: IRootState) => state.datasetSlice.users);
    const userState = useSelector((state: IRootState) => state.datasetSlice.user);
    const [messages, setMessages] = useState<MessageInterface[]>([])
    const [message, setMessage] = useState<string>("")
    const [user, setUser] = useState<UserInterface>();

    const dispatch = useDispatch<AppDispatch>();

    let messagesComponents = useMemo(() => {
        return messages.map((message, index) => <Message key={index} message={message}/>)
    }, [messages])

    const sendWelcomeMessage = useCallback(() => {
        sendAnyMessage(defaultMessage);
    }, [messagesComponents])


    const sendAnyMessage = useCallback((message: string) => {
        if (user && userState && userState.uid && messages) {
            dispatch(sendMessage({
                to: user,
                from: userState,
                messages: [...messages, {uid: userState.uid, value: message}]
            })).then((e) => {
                if (isDispatchFulfilled(e)) {
                    setMessages((oldMessages) => {
                        return userState && userState.uid ? ([...oldMessages, {
                            uid: userState.uid,
                            value: message
                        }]) : oldMessages;
                    })
                }
            })
        }
    }, [dispatch, user, userState, messages])


    const refreshMessages = useCallback(() => {
        if (user?.uid) {
            dispatch(fetchChatsFromUser(user.uid));
        }
    }, [dispatch, user])

    const handleSendMessage = () => {
        sendAnyMessage(message);
        setMessage('');
    }

    const hasMessages = messages.length > 0;
    const params = useParams<{ id: string }>();
    useEffect(() => {
        let id = params.id;
        setUser(users.find(u => u.uid === id))
        setMessages(userState?.chats?.find(m => m.userId === userState?.uid)?.messages ?? []);
    }, [users, userState])

    console.log('messages', messages);
    return (
        <IonContent>
            <div style={{height: '100%'}}>
                <IonGrid style={{height: '100%'}}>
                    <IonRow style={{height: '40%', overflow: 'auto'}}>
                        <IonCol>
                            <UserAttributes isThisUser={false} user={user}/>
                        </IonCol>
                    </IonRow>
                    <IonRow style={{height: '50%', overflow: 'auto'}}>
                        <IonCol>
                            <IonList>
                                {/* Render messages here */}
                                {messagesComponents}
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {!hasMessages ? <IonFooter><IonToolbar>
                        <IonButtons slot="start">
                            <IonFabButton onClick={refreshMessages} size="small"><IonIcon
                                icon={refreshOutline}/>
                            </IonFabButton>
                        </IonButtons>
                        <IonButton fill="outline" class="" expand="block"
                                   onClick={sendWelcomeMessage}>{defaultMessage}</IonButton>
                    </IonToolbar></IonFooter> :

                    <IonFooter>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonFabButton onClick={refreshMessages} size="small"><IonIcon
                                    icon={refreshOutline}/>
                                </IonFabButton>
                            </IonButtons>
                            <IonTextarea value={message} inputmode="text"
                                         onIonInput={(e) => setMessage(e.target.value ?? '')}
                                         autoGrow
                                         rows={1} placeholder="Senden" class="ion-text-center">
                            </IonTextarea>
                            <IonButtons slot="end">
                                <IonFabButton onClick={handleSendMessage} size="small"><IonIcon
                                    icon={sendOutline}/>
                                </IonFabButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonFooter>

                }
            </div>
        </IonContent>
    );
};

export default User;
