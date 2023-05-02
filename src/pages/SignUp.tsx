import React, {useState} from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton, IonRow, IonCol, useIonRouter
} from '@ionic/react';
import {Page} from "../data/enums";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        // Handle form submission here
        goToPage(Page.profile);
    };

    const router = useIonRouter();

    const goToPage = (route: Page) => {
        router.push(route, 'root', 'replace');
    };

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registration</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Email</IonLabel>
                            <IonInput
                                type="email"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                            >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Password</IonLabel>
                            <IonInput
                                type="password"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
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
