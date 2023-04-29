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
    IonRefresherContent, IonRouterLink, IonRow,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

    const [categories, setCategories] = useState<Enums[]>([]);

    useIonViewWillEnter(() => {
        const msgs = getCategories();
        setCategories(msgs);
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
                        <IonCol itemType="a">
                            <IonTitle>Kategorien</IonTitle>
                            <IonCardSubtitle>Wählen Sie alle Kategorien, für die Sie Leute suchen</IonCardSubtitle>
                        </IonCol>
                        <IonRouterLink routerLink="/users">
                            <IonButton>Weiter</IonButton>
                        </IonRouterLink>
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
                    {categories.map(m => <CategoryComponent key={m} message={m}/>)}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Home;
