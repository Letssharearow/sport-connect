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
}

export const UsersPreview = ({users, refresh}: Props) => {

    return <>
        <IonHeader collapse="fade">
            <IonToolbar>
                <IonRow>
                    <IonCol>
                        <IonTitle class="ion-text-center">Coole Leute</IonTitle>
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