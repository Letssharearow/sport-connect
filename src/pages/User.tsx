import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    IonToolbar,
    IonList,
    IonButton, IonFooter, IonTextarea, IonButtons, IonFabButton
} from '@ionic/react';
import {useParams} from "react-router";

import {User as UserInterface, Message as MessageInterface, IRootState} from "../data/models"
import Message from "../components/Message";
import UserAttributes from "../components/UserAttributes";
import {useSelector} from "react-redux";

const defaultMessage = "Hey, lust zusammen Sport zu machen?";
const User = () => {

    const messagesState = useSelector((state: IRootState) => state.datasetSlice.chats);
    const [messages, setMessages] = useState<MessageInterface[]>([])
    const [message, setMessage] = useState<string>("")

    let messagesComponents = useMemo(() => {
        return messages.map(message => <Message message={message}/>)
    }, [messages])

    const sendWelcomeMessage = useCallback(() => {
        setMessages((messagesOld) => [...messagesOld, {value: defaultMessage, isFromMe: true}])
    }, [messagesComponents])

    const sendMessage = () => {
        setMessages((messagesOld) => [...messagesOld, {value: message, isFromMe: true}]);
        setMessage('');
    }

    const hasMessages = messages.length > 0;

    const params = useParams<{ id: string }>();
    const [user, setUser] = useState<UserInterface>();
    useEffect(() => {
        let id = Number(params.id);
        setMessages(messagesState.find(m => m.userId === id)?.messages ?? []);
    }, [])


    return (
        <>
            <div className="ion-padding" style={{
                height: '100%',
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <div>
                    <UserAttributes isThisUser={false} user={user}/>
                </div>
                <div>
                    <IonList>
                        {messagesComponents}
                    </IonList>
                    {!hasMessages ? <IonButton fill="outline" class="" expand="block"
                                               onClick={sendWelcomeMessage}>{defaultMessage}</IonButton> :

                        <IonFooter>
                            <IonToolbar>
                                <IonTextarea value={message} inputmode="text"
                                             onIonInput={(e) => setMessage(e.target.value ?? '')}
                                             autoGrow
                                             rows={1} placeholder="Senden" class="ion-text-center">
                                </IonTextarea>
                                <IonButtons slot="end">
                                    <IonFabButton onClick={sendMessage} size="small">test
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
