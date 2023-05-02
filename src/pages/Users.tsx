import CategoryComponent from '../components/CategoryComponent';
import {useEffect, useState} from 'react';
import {Enums, getCategories} from '../data/enums';
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
import {User} from "../data/models";
import UserItem from "../components/UserItem";

const Home: React.FC = () => {

    const [user, setUser] = useState<User[]>([]);

    useEffect(() => {
        const user = getUsers();
        setUser(user);
    }, []);

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
                        <IonButton>Weiter</IonButton>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <IonList>
                    {user.map(m => <UserItem key={m.id} user={m}/>)}
                </IonList>
            </IonContent>
        </>
    );
};

export default Home;
