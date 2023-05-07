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
import {useDispatch} from "react-redux";
import {setUser} from "../redux/reducers";
import {addOrRemove} from "../utils/functions";

const CategorySelection: React.FC = () => {

    const dispatch = useDispatch();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);


    useEffect(() => {
        const msgs = getCategories();
        setCategories(msgs);
    }, [])

    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
            e.detail.complete();
        }, 3000);
    };

    const onSubmit = () => {
        dispatch(setUser({categories: selectedCategories}))
    };

    const categoriesRendered = useMemo(() => {
        console.log('useMemo', useMemo);
        return categories.map(cat => {
            return (<CategoryComponent isSelected={selectedCategories.includes(cat)}
                                       togglSelected={(cat) => {
                                           setSelectedCategories((cats) => {
                                                   let categories1 = addOrRemove([...cats], cat);
                                                   console.log('categories1', categories1);

                                                   return categories1;
                                               }
                                           )
                                       }}
                                       key={cat}
                                       category={cat}/>);
        })
    }, [selectedCategories, categories])

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
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent/>
                </IonRefresher>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">
                            Inbox
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonList>
                    {categoriesRendered}
                </IonList>
            </IonContent>
        </div>
    );
};

export default CategorySelection;
