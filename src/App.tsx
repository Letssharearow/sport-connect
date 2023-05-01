import {Redirect, Route} from 'react-router-dom';
import {
    IonApp, IonHeader,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs, IonTitle, IonToolbar,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Users from "./pages/Users";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import UserProfileForm from "./components/UserProfileForm";
import {Page} from "./data/enums";
import {accessibilityOutline, chatbubbles, globe, library, playCircle, radio, search} from "ionicons/icons";
import {useSelector} from "react-redux";
import {State} from "./data/models";
import Menue from "./pages/Menue";

setupIonicReact();

const App: React.FC = () => {

    const isLoggedIn = useSelector<{ datasetSlice: State }>((state) => state.datasetSlice.user) !== undefined;

    console.log('isLoggedIn', isLoggedIn);
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Redirect exact path="/" to={Page.login}/>
                    {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
                    <Route path={Page.login} render={() => <Login/>} exact={true}/>
                    <Route path={Page.signup} render={() => <SignUp/>} exact={true}/>
                    <Route path={Page.categories} render={() => <Home/>} exact={true}/>
                    <Route path={Page.menue} render={() => <Menue/>} exact={true}/>
                    <Route path={Page.profile} render={() => <Login/>} exact={true}/>
                    <Route path={Page.users} render={() => <Home/>} exact={true}/>
                    <Route path={Page.contacts} render={() => <div>div div div div div </div>} exact={true}/>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
