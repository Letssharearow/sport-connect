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

    return (<></>
    );
};

export default Menue;
