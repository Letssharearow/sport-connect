import React from 'react';
import {
    IonContent,
} from '@ionic/react';
import {HeaderWithArrows} from "../components/HeaderWithArrows";

const Policy = () => {

    return (
        <>
            <HeaderWithArrows header="Richtlinien"/>
            <IonContent>
                <h2>1. Datenschutzerklärung</h2>
                <p>
                    Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Diese Datenschutzrichtlinie
                    erläutert, wie wir Informationen sammeln, verwenden, offenlegen, übertragen und speichern,
                    die mit unserer App in Verbindung stehen. Bitte lies dir die folgenden Informationen
                    sorgfältig durch.
                </p>

                <h2>2. Informationen, die wir sammeln</h2>
                <p>
                    Wir sammeln Informationen, die du uns bereitstellst, wenn du unsere App verwendest. Diese
                    Informationen können deinen Namen, deine E-Mail-Adresse, dein Benutzerkonto und andere
                    personenbezogene Daten umfassen.
                </p>

                <h2>3. Verwendung von Informationen</h2>
                <p>
                    Wir verwenden die gesammelten Informationen, um unsere App bereitzustellen, zu verbessern
                    und anzupassen. Wir können die Informationen auch verwenden, um mit dir zu kommunizieren,
                    beispielsweise um auf deine Anfragen zu antworten, dir wichtige Benachrichtigungen zu
                    senden oder dir Updates über unsere Dienstleistungen zur Verfügung zu stellen.
                </p>

                <h2>4. Offenlegung von Informationen</h2>
                <p>
                    Wir geben deine persönlichen Daten nicht an Dritte weiter, es sei denn, dies ist zur
                    Erfüllung rechtlicher Verpflichtungen, zum Schutz unserer Rechte oder zur Durchsetzung
                    unserer Allgemeinen Geschäftsbedingungen erforderlich.
                </p>

                <h2>5. Datensicherheit</h2>
                <p>
                    Wir setzen angemessene technische und organisatorische Maßnahmen ein, um die von uns
                    gesammelten Daten vor Verlust, Missbrauch oder unbefugtem Zugriff zu schützen.
                </p>

                <h2>6. Änderungen dieser Richtlinie</h2>
                <p>
                    Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Über wesentliche
                    Änderungen werden wir dich informieren, indem wir eine deutliche Benachrichtigung auf
                    unserer Website veröffentlichen oder dir eine E-Mail senden.
                </p>

                <h2>7. Wer kann deine Daten sehen</h2>
                <p>
                    Die Daten werden sicher in einem Firebase datastore gespeichert. Als Entwickler hat man zugriff auf
                    die Daten und kann
                    dementsprechend alles theoretisch einsehen.
                </p>
                <p style={{height: 400}}/>
            </IonContent>
        </>
    );
};

export default Policy;
