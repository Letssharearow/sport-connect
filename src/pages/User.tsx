import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton, useIonRouter, IonText, IonFooter, IonTextarea, IonButtons, IonFabButton
} from '@ionic/react';
import {Page} from "../data/enums";
import {useParams} from "react-router";
import {getUser} from "../data/users";

import {User as UserInterface, Message as MessageInterface} from "../data/models"
import message from "../components/Message";
import Message from "../components/Message";

const defaultMessage = "Hey, Lust zusammen Sport zu machen?";
const User = () => {

    const [messages, setMessages] = useState<MessageInterface[]>([])

    let messagesComponents = useMemo(() => {
        return messages.map(message => <Message message={message}/>)
    }, [messages])

    const sendWelcomeMessage = useCallback(() => {
        setMessages((messagesOld) => [...messagesOld, {value: defaultMessage, isFromMe: true}])
    }, [messagesComponents])

    const hasMessages = messages.length > 0;

    const params = useParams<{ id: string }>();
    const [user, setUser] = useState<UserInterface>();
    useEffect(() => {
        setUser(getUser(Number(params.id)))
    })


    return (
        <>
            <IonContent class="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonText>{user?.name}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Age</IonLabel>
                        <IonText>{user?.age}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Gender</IonLabel>
                        <IonText>{user?.gender}</IonText>
                    </IonItem>
                </IonList>
                <IonList>
                    {messagesComponents}
                </IonList>
                {!hasMessages && <IonButton fill="outline" class="" expand="block"
                                            onClick={sendWelcomeMessage}>{defaultMessage}</IonButton>}
                {hasMessages &&
                    <IonFooter>
                        <IonToolbar>
                            <IonTextarea autoGrow rows={1} placeholder="Senden" class="ion-text-center">
                            </IonTextarea>
                            <IonButtons slot="end">
                                <IonFabButton size="small">test
                                </IonFabButton>
                                <IonFabButton size="small">test
                                </IonFabButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonFooter>
                }
            </IonContent>
        </>
    );
};

export default User;
