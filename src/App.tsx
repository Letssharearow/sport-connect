import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

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
import Users from "./pages/Users";
import {Page} from "./data/enums";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/" exact={true}>
                    <Redirect to={Page.login}/>
                </Route>
                <Route path={Page.categories} exact={true}>
                    <Home/>
                </Route>
                <Route path={Page.users} exact={true}>
                    <Users/>
                </Route>
                <Route path="/test">
                    <UserProfileForm></UserProfileForm>
                </Route>
                <Route path={Page.login}>
                    <Login></Login>
                </Route>
                <Route path={Page.signup}>
                    <SignUp></SignUp>
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
