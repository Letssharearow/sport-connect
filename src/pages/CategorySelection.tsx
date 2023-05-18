import CategoryComponent from '../components/CategoryComponent';
import {useEffect, useMemo, useState} from 'react';
import {Category, getCategories, Page} from '../data/category';
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
import {HeaderWithArrows} from "../components/HeaderWithArrows";

const CategorySelection: React.FC = () => {

    const dispatch = useDispatch();
    const userCategories = useSelector((state: IRootState) => state.datasetSlice.user?.categories);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(userCategories ?? []);


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
        <>
            <HeaderWithArrows hasBackArrow={false} header="Kategorien" onForwardButton={onSubmit} page={Page.profile}/>
            <IonContent>
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
        </>
    );
};

export default CategorySelection;
