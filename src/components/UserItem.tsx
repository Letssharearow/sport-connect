import React from 'react';
import {
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonIcon,
    IonItem,
    IonRow, IonText
} from '@ionic/react';
import {personCircleOutline} from 'ionicons/icons';
import {User} from "../data/models";

interface Props {
    user: User;
}

const UserItem: React.FC<Props> = ({user}) => {
    return (
        <IonItem routerLink={`/users/${user.uid}`} detail={false}>
            <IonCard style={styles.card}>
                <IonCardContent>
                    <div style={styles.cardContainer}>
                        <IonIcon icon={personCircleOutline} style={styles.icon}/>
                        <div style={styles.attributes}>
                            <IonRow>
                                <IonCol style={styles.col}>
                                    <IonRow>
                                        <IonCardTitle>
                                            <IonText style={styles.name}>{user.name}</IonText>
                                        </IonCardTitle>
                                    </IonRow>
                                    <IonRow>Alter:</IonRow>
                                    <IonRow>Geschlecht:</IonRow>
                                </IonCol>
                                <IonCol>
                                    <IonRow style={{opacity: 0}}>
                                        <IonCardTitle>{"M"}</IonCardTitle>
                                    </IonRow>
                                    <IonRow>{user.age}</IonRow>
                                    <IonRow>{user.gender}</IonRow>
                                </IonCol>
                            </IonRow>
                        </div>
                    </div>
                </IonCardContent>
            </IonCard>
        </IonItem>
    );
};

const styles = {
    card: {
        padding: '10px',
        border: '2px solid var(--ion-color-dark)',
        borderRadius: '10px',
        width: '100%'
    },
    cardContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: '3rem',
        marginRight: '1rem',
    },
    attributes: {
        flex: 1,
        overflow: 'hidden',
    },
    name: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    col: {
        maxWidth: '40%'
    },
};
export default UserItem;
