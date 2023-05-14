import {
    IonCol,
    IonContent,
    IonHeader, IonList,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import UserItem from "./UserItem";
import {User} from "../data/models";

export interface Props {
    users: User[];
    refresh: (e: CustomEvent) => void;
    heading: string;
}

export const UsersPreview = ({users, refresh, heading}: Props) => {

    return <>
        <IonHeader collapse="fade">
            <IonToolbar>
                <IonRow>
                    <IonCol>
                        <IonTitle class="ion-text-center">{heading}</IonTitle>
                    </IonCol>
                </IonRow>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonRefresher slot="fixed" onIonRefresh={refresh}>
                <IonRefresherContent/>
            </IonRefresher>

            <IonList>
                {users.map(m =>
                    <UserItem key={m.uid} user={m}/>)}
            </IonList>
        </IonContent>
    </>
}