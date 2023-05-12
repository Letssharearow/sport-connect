import React, {useEffect, useState} from 'react';
import {IonToast} from '@ionic/react';
import {useDispatch, useSelector} from "react-redux";
import {dismissToast} from "../redux/reducers";
import {IRootState} from "../data/models";

function ToastComponent() {

    const dispatch = useDispatch();
    const toast = useSelector((state: IRootState) => state.datasetSlice.toast);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (toast?.isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [toast])

    return (<IonToast
        onClick={() => dispatch(dismissToast())}
        isOpen={isOpen}
        message={toast?.message}
        color={toast?.color}
        onDidDismiss={() => dispatch(dismissToast())}
        duration={toast?.duration}
        position={toast?.position}
    />)
}

export default ToastComponent;