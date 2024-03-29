import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonRouterLink,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";
import {arrowForwardOutline} from "ionicons/icons";
import {Page} from "../data/category";

interface Props {
    header: string;
    onForwardButton?: () => void;
    hasBackArrow?: boolean;
}

export const HeaderWithArrows: React.FC<Props> = ({
                                                      header,
                                                      onForwardButton,
                                                      hasBackArrow = true
                                                  }: Props) => {
    return (<IonHeader>
        <IonToolbar>
            <IonButtons style={{opacity: hasBackArrow ? 100 : 0}} slot="start">
                <IonBackButton disabled={!hasBackArrow} defaultHref="/"/>
            </IonButtons>
            <IonTitle class="ion-text-center">{header}
            </IonTitle>
            <IonButtons onClick={onForwardButton} style={{opacity: onForwardButton ? 100 : 0}} slot="end">
                <IonButton>
                    <IonIcon color="dark" style={{fontSize: 24}} icon={arrowForwardOutline}/>
                </IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>)
}