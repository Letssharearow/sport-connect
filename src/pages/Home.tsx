import CategoryComponent from '../components/CategoryComponent';
import {useState} from 'react';
import {Categories, getCategories} from '../data/messages';
import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

    const [categories, setCategories] = useState<Categories[]>([]);

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
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inbox</IonTitle>
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
