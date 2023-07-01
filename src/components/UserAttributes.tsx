import {
    IonAvatar,
    IonButton, IonCol, IonGrid,
    IonInput,
    IonItem, IonItemDivider,
    IonLabel,
    IonList,
    IonRouterLink, IonRow,
    IonSelect,
    IonSelectOption,
    IonText
} from "@ionic/react";
import Categories from "./Categories";
import {Category, Gender, getCategories, Page} from "../data/category";
import React, {useMemo, useState} from "react";
import {IRootState, User} from "../data/models";
import CategoryComponent from "./CategoryComponent";
import {addOrRemove} from "../utils/functions";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../index";
import {setUser} from "../redux/reducers";

interface Props {
    isThisUser: boolean;
    user: User | undefined;
    handleNameChange?: (event: any) => void;
    handleAgeChange?: (event: any) => void;
    handleGenderChange?: (event: any) => void;
}

const allCategories = getCategories()

const UserAttributes: React.FC<Props> = ({
                                             isThisUser = false,
                                             user,
                                             handleGenderChange,
                                             handleNameChange,
                                             handleAgeChange
                                         }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((state: IRootState) => state.datasetSlice.user)

    const remainingCategories = useMemo(() => {
            return allCategories.filter(cat => !user?.categories?.includes(cat))
        }, [user?.categories]
    )

    return <>
        <IonList>
            {
                isThisUser ?
                    <>
                        <IonItem>
                            <IonInput labelPlacement="floating" label="Name" readonly={!isThisUser} type="text"
                                      value={user?.name}
                                      onIonInput={handleNameChange}/>
                        </IonItem>
                        <IonItem>
                            <IonInput labelPlacement="floating" label="Age" readonly={!isThisUser} type="number"
                                      value={user?.age}
                                      onIonInput={handleAgeChange}/>
                        </IonItem>
                        <IonItem>
                            <IonSelect disabled={!isThisUser} label="Gender" value={user?.gender}
                                       onIonChange={handleGenderChange}>
                                <IonSelectOption value={Gender.male}>Male</IonSelectOption>
                                <IonSelectOption value={Gender.female}>Female</IonSelectOption>
                                <IonSelectOption value={Gender.divers}>Other</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </> : <div className="ion-text-center">
                        <IonText>Alter: {user?.age}</IonText>
                        <br/>
                        <IonText>Geschlecht: {user?.gender}</IonText>
                    </div>
            }
        </IonList>
        <div className="ion-text-center">
            <IonList>
                {user?.categories?.map((cat, index) => {
                    return (<CategoryComponent isSelected={userState?.categories?.includes(cat) ?? false}
                                               togglSelected={isThisUser ? (cat) => {
                                                   dispatch(setUser({
                                                       ...user,
                                                       categories: addOrRemove([...user?.categories ?? []], cat)
                                                   }))
                                               } : () => void 0}
                                               key={index}
                                               category={cat}
                                               icon={isThisUser ? "removeOutline" : undefined}/>);
                })}
            </IonList>
            {isThisUser && <IonItemDivider/>}
            {
                isThisUser && <IonList>
                    {remainingCategories.map((cat, index) => {
                        return (<CategoryComponent isSelected={false}
                                                   togglSelected={(cat) => {
                                                       dispatch(setUser({
                                                           ...user,
                                                           categories: addOrRemove([...user?.categories ?? []], cat)
                                                       }))
                                                   }}
                                                   key={index}
                                                   category={cat}
                                                   icon="addOutline"/>);
                    })}
                </IonList>
            }
        </div>
    </>;
};

export default UserAttributes;
