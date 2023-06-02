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
    IonButton,
    IonRow,
    IonCol,
    IonIcon,
    useIonRouter,
    IonToast,
} from '@ionic/react';
import {Page} from '../data/category';
import {useDispatch, useSelector} from 'react-redux';
import {setToast} from '../redux/reducers';
import {register} from '../utils/firebaseConfig';
import {HeaderWithArrows} from '../components/HeaderWithArrows';
import {person, lockClosed} from 'ionicons/icons';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        register(email, password)
            .then((r) => {
                dispatch(setToast({message: 'Successfully registered', color: 'success'}));
                goToPage(Page.login);
            })
            .catch((err) => {
                dispatch(setToast({message: err.message, color: 'danger'}));
            });
    };

    const router = useIonRouter();
    const goToPage = (route: Page) => {
        router.push(route, 'root', 'replace');
    };

    return (
        <>
            <HeaderWithArrows header="Registration"/>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonIcon icon={person} slot="start"/>
                        <IonInput
                            type="email"
                            value={email}
                            placeholder="Email"
                            onIonChange={(e) => setEmail(e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonIcon icon={lockClosed} slot="start"/>
                        <IonInput
                            type="password"
                            value={password}
                            placeholder="Password"
                            onIonChange={(e) => setPassword(e.detail.value!)}
                        />
                    </IonItem>
                </IonList>
                <IonButton expand="block" onClick={handleSubmit}>
                    Register
                </IonButton>
                <IonRow className="ion-justify-content-center ion-padding-top">
                    <IonCol className="ion-text-center">
                        Du hast bereits einen Account? <a href="#" onClick={() => goToPage(Page.login)}>Log in</a>
                    </IonCol>
                </IonRow>
            </IonContent>
        </>
    );
};

export default SignUp;
