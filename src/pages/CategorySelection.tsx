import CategoryComponent from '../components/CategoryComponent';
import {useEffect, useMemo, useState} from 'react';
import {Enums, getCategories, Page} from '../data/enums';
import {
    IonButton,
    IonCardSubtitle,
    IonCol,
    IonContent,
    IonHeader, IonIcon,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonRouterLink,
    IonRow,
    IonTitle,
    IonToolbar, useIonRouter
} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/reducers";
import {addOrRemove} from "../utils/functions";
import {IRootState} from "../data/models";
import {chevronForwardOutline} from "ionicons/icons";

const CategorySelection: React.FC = () => {

    const dispatch = useDispatch();
    const userCategories = useSelector((state: IRootState) => state.datasetSlice.user?.categories);
    const [categories, setCategories] = useState<Enums[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Enums[]>(userCategories ?? []);


    useEffect(() => {
        const msgs = getCategories();
        setCategories(msgs); //TODO: move categories here
    }, [])
    const disabled = selectedCategories.length <= 0;

    const router = useIonRouter();
    const goToPage = (route: Page) => {
        router.push(route, 'root', 'replace');
    };
    const onSubmit = () => {
        dispatch(setUser({categories: selectedCategories}));
        goToPage(Page.profile);
    };

    return (
        <div id="home-page">
            <IonHeader collapse="fade">
                <IonToolbar>
                    <IonRow>
                        <IonCol itemType="a">
                            <IonTitle class="ion-text-center">Kategorien</IonTitle>
                        </IonCol>
                        <IonButton disabled={disabled} onClick={onSubmit}>
                            <IonIcon icon={chevronForwardOutline}/>
                        </IonButton>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">
                            Inbox
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    {categories.map(cat => {
                        return (<CategoryComponent isSelected={selectedCategories.includes(cat)}
                                                   togglSelected={(cat) => {
                                                       setSelectedCategories((cats) => addOrRemove([...cats], cat)
                                                       )
                                                   }}
                                                   key={cat}
                                                   category={cat}/>);
                    })}
                </IonList>
            </IonContent>
        </div>
    );
};

export default CategorySelection;
