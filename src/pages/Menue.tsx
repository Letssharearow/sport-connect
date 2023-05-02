import {Redirect, Route} from 'react-router-dom';
import {
    IonHeader,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs, IonTitle, IonToolbar,
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Theme variables */
import {accessibilityOutline, chatbubbles, globe} from "ionicons/icons";
import {Page} from "../data/enums";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import Users from "./Users";
import UserItem from "../components/UserItem";
import User from "./User";

const Menue: React.FC = () => {

    return (

        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path={Page.menue} to={Page.profile}/>
                {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
                <Route path={Page.profile} render={() => <Profile/>} exact={true}/>
                <Route path={Page.users} render={() => <Users/>} exact={true}/>
                <Route path={Page.contacts} render={() => <div>div div div div div </div>} exact={true}/>
                <Route path="/users/:id">
                    <User/>
                </Route>
            </IonRouterOutlet>


            <IonTabBar slot="bottom">
                <IonTabButton tab="profile" href={Page.profile}>
                    <IonIcon icon={accessibilityOutline}/>
                    <IonLabel>Profil</IonLabel>
                </IonTabButton>

                <IonTabButton tab="users" href={Page.users}>
                    <IonIcon icon={globe}/>
                    <IonLabel>Entdecke</IonLabel>
                </IonTabButton>

                <IonTabButton tab="contacts" href={Page.contacts}>
                    <IonIcon icon={chatbubbles}/>
                    <IonLabel>Chats</IonLabel>
                </IonTabButton>
            </IonTabBar>

        </IonTabs>
    );
};

export default Menue;
