import {
    IonButton,
    IonCol,
    IonContent,
    IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRouterLink, IonRow,
    IonTitle, IonToast,
    IonToolbar, useIonRouter, useIonToast
} from "@ionic/react";
import {personCircle} from "ionicons/icons";
import React, {useEffect, useState} from "react";
import {getDocument, getDocuments, login, saveDoc, setSingleDoc} from "../utils/firebaseConfig";
import {useDispatch, useSelector} from "react-redux";
import {setToast} from "../redux/reducers";
import {Category, Gender, Page} from "../data/category";
import {loginAction} from "../redux/asyncActions";
import {AppDispatch} from "../index";
import {IRootState} from "../data/models";

function Login() {
    const [email, setEmail] = useState("testuser3@gamil.com");
    const [password, setPassword] = useState("test123");
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: IRootState) => state.datasetSlice.user);

    const router = useIonRouter();
    const goToPage = (route: Page) => {
        router.push(route, 'root', 'replace');
    };


    const handleLogin = async () => {
        dispatch(loginAction({email, password})).then((e) => {
            if (e.meta?.requestStatus === 'fulfilled') {
                if (user?.categories && user?.categories.length > 0) {
                    goToPage(Page.profile);
                } else {
                    goToPage(Page.categories);
                }
            }
        })
    };

    return (<IonContent style={{height: '100vh'}}>

        <IonHeader>
            <IonToolbar>
                <IonTitle class="ion-text-center">Login</IonTitle>
            </IonToolbar>
        </IonHeader>

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
                    By clicking LOGIN you agree to our <a href="#">Policy</a>
                </p>
                <IonButton expand="block" onClick={handleLogin}>
                    Login
                </IonButton>

                <p style={{fontSize: "medium"}}>
                    Don't have an account? <> </>
                    <IonRouterLink routerLink="/signup">
                        <a href="">Sign up!</a>
                    </IonRouterLink>
                </p>

                <p style={{fontSize: "medium"}}>
                    Don't want to sign u? <> </>
                    <IonRouterLink routerLink="/categories">
                        <a href="">Skip Sign up!</a>
                    </IonRouterLink>
                </p>
            </IonCol>
        </IonRow>

    </IonContent>)
}

export default Login