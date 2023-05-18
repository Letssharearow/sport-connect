import {IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar} from "@ionic/react";
import React from "react";

interface Props {
    header: string;
}

export const BackArrowHeader: React.FC<Props> = ({header}: Props) => {
    return (<IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref="/"/>
            </IonButtons>
            <IonTitle class="ion-text-center">{header}</IonTitle>
            <IonButtons style={{opacity: 0}} slot="end">
                <IonBackButton defaultHref="/"/>
            </IonButtons>
        </IonToolbar>
    </IonHeader>)
}