import {
    IonButton,
    IonCol,
    IonContent,
    IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRouterLink, IonRow,
    IonTitle, IonToast,
    IonToolbar, useIonToast
} from "@ionic/react";
import {personCircle} from "ionicons/icons";
import {useState} from "react";
import {getDocuments, login, saveDoc} from "../utils/firebaseConfig";
import {setUserState} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";

function Login() {
    const [email, setEmail] = useState("test@gmail.com");
    const [password, setPassword] = useState("test");
    const [isOpen, setIsOpen] = useState(false);

    const handleLogin = async () => {
        console.log('email password', email, password);
        const res = await login(email, password);
        setIsOpen(true);
        await saveDoc();
        await getDocuments();
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

        <IonToast
            isOpen={isOpen}
            message="This toast will close in 5 seconds"
            onDidDismiss={() => setIsOpen(false)}
            duration={5000}
        />

    </IonContent>)
}

export default Login