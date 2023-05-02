import React, {useEffect, useState} from 'react';
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
    IonButton, useIonRouter, IonText
} from '@ionic/react';
import {Page} from "../data/enums";
import {useParams} from "react-router";
import {getUser} from "../data/users";

import {User as UserInterface} from "../data/models"

const User = () => {

    const handleSubmit = () => {

    }

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
                <IonButton expand="block" onClick={handleSubmit}>chat</IonButton>
            </IonContent>
        </>
    );
};

export default User;
