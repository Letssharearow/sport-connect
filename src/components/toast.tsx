import React from 'react';
import {UseIonToastResult} from '@ionic/react';

async function toast(this: any, message: string) {
    const toast = await this.toastController.create({
        message: message,
        duration: 1500,
        position: "bottom"
    });

    await toast.present();
}

export default toast;