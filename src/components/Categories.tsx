import CategoryComponent from '../components/CategoryComponent';
import {Category,} from '../data/category';
import {
    IonList,
} from '@ionic/react';
import {addOrRemove} from "../utils/functions";

interface Props {
    categories: Category[];
}


const Categories: React.FC<Props> = ({categories}) => {
    return (
        <IonList>
            {categories.map((cat, index) => {
                return (<CategoryComponent isSelected={false}
                                           togglSelected={(cat) => void 0}
                                           key={index}
                                           category={cat}/>);
            })}
        </IonList>
    );
};

export default Categories;
