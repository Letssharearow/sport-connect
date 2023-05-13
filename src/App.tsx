import {Redirect, Route} from 'react-router-dom';
import {
    IonApp, IonHeader,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs, IonTitle, IonToast, IonToolbar,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import CategorySelection from './pages/CategorySelection';
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
import {Page} from "./data/category";
import {accessibilityOutline, chatbubbles, globe, library, playCircle, radio, search} from "ionicons/icons";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "./data/models";
import Profile from "./pages/Profile";
import './App.css'
import User from "./pages/User";
import React, {useState} from "react";
import {dismissToast} from "./redux/reducers";
import ToastComponent from './components/ToastComponent';
import {useLoading} from "./hooks/useLoading";

setupIonicReact();

const App: React.FC = () => {
    const user = useSelector((state: IRootState) => state.datasetSlice.user);
    const isProfileSetup = user?.categories && user?.categories.length > 0;
    const isLoggedIn = user?.uid;
    useLoading();

    return (
        <IonApp>
            <IonReactRouter>

                <IonTabs>
                    <IonRouterOutlet>
                        <Route path={Page.profile} render={() => <Profile/>} exact={true}/>
                        <Route path={Page.users} render={() => <Users/>} exact={true}/>
                        <Route path={Page.contacts} render={() => <div>Hier fehlt noch was</div>} exact={true}/>
                        <Route path="/users/:id">
                            <User/>
                        </Route>
                        <Redirect exact path="/" to={Page.login}/>
                        <Route path={Page.login} render={() => <Login/>} exact={true}/>
                        <Route path={Page.signup} render={() => <SignUp/>} exact={true}/>
                        <Route path={Page.categories} render={() => <CategorySelection/>} exact={true}/>
                        <Route path={Page.profile} render={() => <Profile/>} exact={true}/>
                        <Route path={Page.users} render={() => <Users/>} exact={true}/>
                        {/*{isProfileSetup ? <Redirect to={Page.profile} path={Page.login} exact/> : null}*/}
                    </IonRouterOutlet>


                    {
                        isProfileSetup ? <IonTabBar slot="bottom">
                            <IonTabButton tab="profile" href={Page.profile}>
                                <IonIcon icon={accessibilityOutline}/>
                                <IonLabel>Profil</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="users" href={Page.users}>
                                <IonIcon icon={globe}/>
                                <IonLabel>Entdecke</IonLabel>
                            </IonTabButton>

                            <IonTabButton tab="contacts" href={isLoggedIn ? Page.contacts : Page.login}>
                                <IonIcon icon={chatbubbles}/>
                                <IonLabel>Chats</IonLabel>
                            </IonTabButton>
                        </IonTabBar> : <IonTabBar></IonTabBar>
                    }

                </IonTabs>
            </IonReactRouter>
            <ToastComponent/>)
        </IonApp>
    );
}

export default App;
