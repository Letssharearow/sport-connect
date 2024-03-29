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
import {Endpoint, Page} from "./data/category";
import {accessibilityOutline, chatbubbles, globe} from "ionicons/icons";
import {useDispatch, useSelector} from "react-redux";
import {ChatFirebase, IRootState, Message} from "./data/models";
import Profile from "./pages/Profile";
import './App.css'
import User from "./pages/User";
import React, {useEffect, useRef} from "react";
import ToastComponent from './components/ToastComponent';
import Contacts from "./pages/Contacts";
import Policy from "./pages/Policy";
import {subscribe} from "./utils/firebaseConfig";
import {setChats, setIsProfileSetup, setToast} from "./redux/reducers";
import {AppDispatch} from "./index";
import {fetchChatsFromUser, fetchUsers} from "./redux/asyncActions";
import {debug} from "./data/constantValues";
import ExploreContainer from "./components/ExploreContainer";

setupIonicReact();

const App: React.FC = () => {
    const user = useSelector((state: IRootState) => state.datasetSlice.user);
    const isProfileSetup = useSelector((state: IRootState) => state.datasetSlice.isProfileSetup);
    const isLoggedIn = user?.uid;

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);


    const unsub = useRef<any | null>(null);

    useEffect(() => {
        if (user?.uid && unsub.current === null) {
            dispatch(fetchChatsFromUser(user.uid));
            unsub.current = subscribe(Endpoint.chats, user.uid, (chats: any) => {
                console.log('chats', chats);
                const map = chats.data()?.chats;
                if (debug) console.debug('subscribe map', map);
                dispatch(setChats(map as ChatFirebase))
            });
        }
        if (user?.categories && user?.categories.length > 0) {
            if (user.name && user.age && user.gender || (user && !user.uid)) {
                dispatch(setIsProfileSetup(true));
            } else {
                dispatch(setIsProfileSetup(false));
            }
        } else {
            dispatch(setIsProfileSetup(false));
        }
    }, [user, dispatch]);

    const state = useSelector((state: IRootState) => state.datasetSlice)
    useEffect(() => {
        if (debug) console.debug('state', state);
    }, [state]);

    return (
        <IonApp>
            <IonReactRouter>

                <IonTabs>
                    <IonRouterOutlet>
                        <Route path={Page.profile} render={() => <Profile/>} exact={true}/>
                        <Route path={Page.users} render={() => <Users/>} exact={true}/>
                        <Route path={Page.contacts} render={() => <Contacts/>} exact={true}/>
                        <Route path={Page.users + "/:id"}>
                            <User/>
                        </Route>
                        <Redirect exact path="/" to={Page.login}/>
                        <Route path={Page.login} render={() => <Login/>} exact={true}/>
                        <Route path={Page.signup} render={() => <SignUp/>} exact={true}/>
                        <Route path={Page.policy} render={() => <Policy/>} exact={true}/>
                        <Route path={Page.categories} render={() => <CategorySelection/>} exact={true}/>
                        <Route path={Page.profile} render={() => <Profile/>} exact={true}/>
                        <Route path={Page.users} render={() => <Users/>} exact={true}/>
                    </IonRouterOutlet>


                    {
                        <IonTabBar slot="bottom" onClick={!isProfileSetup ? (() => {
                            dispatch(setToast({
                                message: "Bitte verfolständige dein Profil oder Logge dich ein",
                                color: "medium"
                            }))
                        }) : void 0}>
                            <IonTabButton disabled={!isProfileSetup} tab="profile" href={Page.profile}>
                                <IonIcon icon={accessibilityOutline}/>
                                <IonLabel>Profil</IonLabel>
                            </IonTabButton>

                            <IonTabButton disabled={!isProfileSetup} tab="users" href={Page.users}>
                                <IonIcon icon={globe}/>
                                <IonLabel>Entdecke</IonLabel>
                            </IonTabButton>

                            <IonTabButton disabled={!isProfileSetup} tab="contacts"
                                          href={isLoggedIn ? Page.contacts : Page.login}>
                                <IonIcon icon={chatbubbles}/>
                                <IonLabel>Chats</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    }

                </IonTabs>
            </IonReactRouter>
            <ToastComponent/>)
        </IonApp>
    );
}

export default App;
