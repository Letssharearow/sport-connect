import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    IonToolbar,
    IonList,
    IonButton, IonFooter, IonTextarea, IonButtons, IonFabButton, IonIcon
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

    //    border: 3px solid black;
    //     border-radius: 20px;
    return (
        <>
            <div className="ion-padding" style={{
                height: '100%',
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: 'darkgreen'
            }}>
                <div style={{
                    height: '100%',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    padding: 3,
                }}>

                    <div style={{
                        height: '49.5%', overflow: 'scroll', border: '3px solid black',
                        borderRadius: '20px',
                    }}>
                        <UserAttributes isThisUser={false} user={user}/>
                    </div>
                    <div style={{
                        height: '49.5%', overflow: 'scroll', border: '3px solid black',
                        borderRadius: '20px',
                    }}>
                        <IonList>
                            {messagesComponents}
                        </IonList>
                    </div>
                </div>
                <div style={{border: '3px solid black'}}>
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
            </div>
        </>
    );
};

export default User;
