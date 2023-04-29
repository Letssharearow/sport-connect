import CategoryComponent from '../components/CategoryComponent';
import {useState} from 'react';
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
import './Home.css';
import {getUser} from "../data/users";
import {User} from "../data/models";

const Home: React.FC = () => {

    const [user, setUser] = useState<User[]>([]);

    useIonViewWillEnter(() => {
        const user = getUser();
        setUser(user);
    });

    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
            e.detail.complete();
        }, 3000);
    };

    return (
        <IonPage id="home-page">
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

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">
                            Inbox
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    {user.map(m => <CategoryComponent key={m.id} message={m.name}/>)}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Home;
