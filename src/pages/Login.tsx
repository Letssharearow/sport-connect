import {
    IonButton,
    IonCol,
    IonContent,
    IonHeader, IonIcon, IonInput, IonItem, IonRouterLink, IonRow,
    IonTitle,
    IonToolbar, useIonRouter
} from "@ionic/react";
import {personCircle} from "ionicons/icons";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Page} from "../data/category";
import {loginAction} from "../redux/asyncActions";
import {AppDispatch} from "../index";
import {IRootState} from "../data/models";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: IRootState) => state.datasetSlice.user);
    const isProfileSetup = useSelector((state: IRootState) => state.datasetSlice.isProfileSetup);

    const router = useIonRouter();
    const goToPage = (route: Page) => {
        router.push(route, 'root', 'replace');
    };

    useEffect(() => {
        if (user?.uid) {
            if (isProfileSetup) {
                goToPage(Page.users);
            } else {
                goToPage(Page.categories);
            }
        }
    }, [user, isProfileSetup])


    const handleLogin = async () => {
        dispatch(loginAction({email, password}));
    };

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="ion-text-center">Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{height: '100vh'}}>
                <IonRow class="ion-text-center">
                    <IonCol>
                        <IonIcon
                            style={{fontSize: "70px", color: "#0040ff"}}
                            icon={personCircle}
                        />
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                labelPlacement="floating"
                                label="Email"
                                type="email"
                                value={email}
                                onIonInput={(e) => setEmail(e.detail.value!)}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonInput
                                labelPlacement="floating"
                                label="Password"
                                type="password"
                                value={password}
                                onIonInput={(e) => setPassword(e.detail.value!)}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <p style={{fontSize: "small"}}>
                            Indem Sie auf LOGIN klicken, stimmen Sie unseren
                            <IonRouterLink routerLink={Page.policy}>
                                <a href="">Richtlinien</a>
                            </IonRouterLink> zu!
                        </p>
                        <IonButton expand="block" onClick={handleLogin}>
                            Login
                        </IonButton>

                        <p style={{fontSize: "medium"}}>
                            Noch keinen Account? <> </>
                            <IonRouterLink routerLink={Page.signup}>
                                <a href="">Sign up!</a>
                            </IonRouterLink>
                        </p>

                        <p style={{fontSize: "medium"}}>
                            Du möchtest erstmal nur stöbern? <> </>
                            <IonRouterLink routerLink={Page.categories}>
                                <a href="">Skip Sign up!</a>
                            </IonRouterLink>
                        </p>
                    </IonCol>
                </IonRow>
            </IonContent>
        </>)
}

export default Login