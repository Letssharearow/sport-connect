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

function Login() {
    const [email, setEmail] = useState("testuser3@gamil.com");
    const [password, setPassword] = useState("test123");
    const dispatch = useDispatch();

    const router = useIonRouter();
    const goToPage = (route: Page) => {
        router.push(route, 'root', 'replace');
    };


    const handleLogin = async () => {
        login(email, password).then(() => {
            dispatch(setToast({message: "logged in", color: "success"}))
            goToPage(Page.profile);
        }).catch(err => dispatch(setToast({message: err.message, color: "danger"})));
    };

    return (<IonContent style={{height: '100vh'}}>

        <IonHeader>
            <IonToolbar>
                <IonTitle>Login</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonRow>
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