import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
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

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path="/" to={Page.login}/>
                    {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
                    <Route path={Page.login} render={() => <Login/>} exact={true}/>
                    <Route path={Page.signup} render={() => <div>hallo</div>} exact={true}/>
                    <Route path={Page.users} render={() => <Home/>} exact={true}/>
                    <Route path={Page.profile} render={() => <div>div div div div div </div>} exact={true}/>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                    <IonTabButton tab="home" href={Page.login}>
                        <IonIcon icon={playCircle}/>
                        <IonLabel>Listen now</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="radio" href={Page.signup}>
                        <IonIcon icon={radio}/>
                        <IonLabel>Radio</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="library" href={Page.users}>
                        <IonIcon icon={library}/>
                        <IonLabel>Library</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="search" href={Page.profile}>
                        <IonIcon icon={search}/>
                        <IonLabel>Search</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
