import CategoryComponent from '../components/CategoryComponent';
import {useEffect, useMemo, useState} from 'react';
import {Category, getCategories, Page} from '../data/category';
import {
    IonButton,
    IonCardSubtitle,
    IonCol,
    IonContent,
    IonHeader,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonRouterLink,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/reducers";
import {addOrRemove} from "../utils/functions";
import {IRootState} from "../data/models";

const CategorySelection: React.FC = () => {

    const dispatch = useDispatch();
    const userCategories = useSelector((state: IRootState) => state.datasetSlice.user?.categories);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(userCategories ?? []);


    useEffect(() => {
        const msgs = getCategories();
        setCategories(msgs); //TODO: move categories here
    }, [])

    const onSubmit = () => {
        dispatch(setUser({categories: selectedCategories}))
    };

    return (
        <div id="home-page">
            <IonHeader collapse="fade">
                <IonToolbar>
                    <IonRow>
                        <IonCol itemType="a">
                            <IonTitle>Kategorien</IonTitle>
                            <IonCardSubtitle>Wählen Sie alle Kategorien, für die Sie Leute suchen</IonCardSubtitle>
                        </IonCol>
                        <IonRouterLink routerLink={Page.profile}>
                            <IonButton onClick={onSubmit}>Weiter</IonButton>
                        </IonRouterLink>
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
