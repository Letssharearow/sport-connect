import {
    IonCol,
    IonContent,
    IonHeader, IonItem,
    IonLabel,
    IonList,
    IonRange,
    IonRefresher,
    IonRefresherContent,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import UserItem from "./UserItem";
import {IRootState, User} from "../data/models";
import {useDispatch, useSelector} from "react-redux";
import {setDistance} from "../redux/reducers";

export interface Props {
    users: User[];
    refresh: (e: CustomEvent) => void;
    heading: string;
}

export const UsersPreview = ({users, refresh, heading}: Props) => {
    const distance = useSelector((state: IRootState) => state.datasetSlice.distance);
    const dispatch = useDispatch()
    const handleSliderChange = (e: CustomEvent) => {
        const selectedValue = e.detail.value;
        dispatch(setDistance(selectedValue))
        console.log("Selected value:", selectedValue);
    };

    return (
        <>
            <IonHeader collapse="fade">
                <IonToolbar>
                    <IonRow>
                        <IonCol>
                            <IonTitle class="ion-text-center">{heading}</IonTitle>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent/>
                </IonRefresher>
                <IonList>
                    <IonItem>
                        <div style={{padding: "16px", width: "100%"}}>
                            <IonLabel>Entfernung: {distance}</IonLabel>
                            <IonRange aria-label="Custom range" min={3} max={100} value={distance} step={1} pin={true}
                                      ticks={true}
                                      onIonChange={handleSliderChange}
                            ></IonRange>
                        </div>
                    </IonItem>
                    {users.map((m) => (
                        <UserItem key={m.uid} user={m}/>
                    ))}
                </IonList>
            </IonContent>
        </>
    );
};
