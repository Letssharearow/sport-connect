import React, {useState} from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton, IonRow, IonCol, useIonRouter, IonToast
} from '@ionic/react';
import {Page} from "../data/category";
import {useDispatch, useSelector} from "react-redux";
import {setToast} from "../redux/reducers";
import {register} from "../utils/firebaseConfig";
import {HeaderWithArrows} from "../components/HeaderWithArrows";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = () => {
        register(email, password).then(r => {
            dispatch(setToast({message: "registered", color: "success"}))
            goToPage(Page.login)
        }).catch(err => {
            dispatch(setToast({message: err.message, color: "danger"}))
        })
    };

    const router = useIonRouter();
    const goToPage = (route: Page) => {
        router.push(route, 'root', 'replace');
    };

    return (
        <>
            <HeaderWithArrows header="Registration"/>
            <IonContent>
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
                <IonButton expand="block" onClick={handleSubmit}>Register</IonButton>
            </IonContent>
        </>
    );
};

export default SignUp;
