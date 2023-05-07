import CategoryComponent from '../components/CategoryComponent';
import {Category,} from '../data/category';
import {
    IonList,
} from '@ionic/react';
import {addOrRemove} from "../utils/functions";

const Categories: React.FC<{ categories: Category[] }> = ({categories}) => {
    return (
        <IonList>
            {categories.map(cat => <CategoryComponent isSelected={categories.includes(cat)}
                                                      togglSelected={(cat) => addOrRemove(categories, cat)}
                                                      key={cat}
                                                      category={cat}/>)}
        </IonList>
    );
};

export default Categories;
