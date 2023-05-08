import CategoryComponent from '../components/CategoryComponent';
import {useEffect, useState} from 'react';
import {Category, getCategories} from '../data/category';
import {
    IonButton, IonCardSubtitle, IonCol,
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent, IonRow,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import {getUsers} from "../data/users";
import {IRootState, User} from "../data/models";
import UserItem from "../components/UserItem";
import {useSelector} from "react-redux";

const Home: React.FC = () => {

    const usersState = useSelector((state: IRootState) => state.datasetSlice.users);
    const [users, setUsers] = useState<User[]>(usersState);

    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
            e.detail.complete();
        }, 3000);
    };

    return (
        <>
            <IonHeader collapse="fade">
                <IonToolbar>
                    <IonRow>
                        <IonCol>
                            <IonTitle>Coole Leute</IonTitle>
                            <IonCardSubtitle>Wählen Sie alle Leute, mit denen Sie gerne aktiv werden
                                wollen</IonCardSubtitle>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <IonList>
                    {users.map(m => <UserItem key={m.id} user={m}/>)}
                </IonList>
            </IonContent>
        </>
    );
};

export default Home;
