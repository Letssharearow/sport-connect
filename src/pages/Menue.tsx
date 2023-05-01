import CategoryComponent from '../components/CategoryComponent';
import {useState} from 'react';
import {Enums, getCategories, Page} from '../data/enums';
import {
    IonButton, IonCardSubtitle, IonCol,
    IonContent, IonFooter,
    IonHeader, IonIcon, IonLabel,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent, IonRouterLink, IonRow,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter, IonTabButton, IonTabBar, IonTabs, IonRouterOutlet
} from '@ionic/react';
import './Home.css';
import {library, playCircle, radio, search, accessibilityOutline, chatbubbles, globe} from "ionicons/icons";
import {Redirect, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Users from "./Users";
import SignUp from "./SignUp";
import {IonReactRouter} from "@ionic/react-router";

const Menue: React.FC = () => {

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
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path="/" to={Page.profile}/>
                    {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
                    <Route path={Page.profile} render={() => <Login/>} exact={true}/>
                    <Route path={Page.users} render={() => <Users/>} exact={true}/>
                    <Route path={Page.contacts} render={() => <SignUp/>} exact={true}/>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                    <IonTabButton tab="profile" href={Page.profile}>
                        <IonIcon icon={accessibilityOutline}/>
                        <IonLabel>Account</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="users" href={Page.users}>
                        <IonIcon icon={globe}/>
                        <IonLabel>Neue Leute</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="contacts" href={Page.contacts}>
                        <IonIcon icon={chatbubbles}/>
                        <IonLabel>Chats</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
};

export default Menue;
