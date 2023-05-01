import CategoryComponent from '../components/CategoryComponent';
import {useEffect, useState} from 'react';
import {Enums, getCategories, Page} from '../data/enums';
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

const Home: React.FC = () => {

    const [categories, setCategories] = useState<Enums[]>([]);


    useEffect(() => {
        const msgs = getCategories();
        console.log('msgs', msgs);
        setCategories(msgs);
    }, [])

    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
            e.detail.complete();
        }, 3000);
    };

    return (
        <div id="home-page">
            <IonHeader collapse="fade">
                <IonToolbar>
                    <IonRow>
                        <IonCol itemType="a">
                            <IonTitle>Kategorien</IonTitle>
                            <IonCardSubtitle>Wählen Sie alle Kategorien, für die Sie Leute suchen</IonCardSubtitle>
                        </IonCol>
                        <IonRouterLink routerLink={Page.menue}>
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
        </div>
    );
};

export default Home;
