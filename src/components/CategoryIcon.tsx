import {
    IonCard, IonIcon,
    IonItem,
    IonText,
} from '@ionic/react';
import './MessageListItem.css';
import {Category} from "../data/category";
import React, {useState} from "react";
import {IRootState, Message as MessageModel} from "../data/models";
import {useSelector} from "react-redux";
import {
    barbell,
    barbellOutline, basketball, basketballOutline,
    bicycle,
    bicycleOutline,
    boat,
    boatOutline,
    bodyOutline, ellipse, ellipseOutline, fish, fishOutline, football, footballOutline,
    footsteps,
    footstepsOutline,
    golf,
    golfOutline,
    golfSharp,
    musicalNote,
    musicalNotes,
    musicalNotesOutline,
    paw,
    pawOutline, people, peopleOutline, remove, removeOutline, snow, snowOutline,
    tennisball,
    tennisballOutline, trendingDown, trendingDownOutline,
    trendingUp,
    trendingUpOutline,
    walk,
    walkOutline, water, waterOutline
} from "ionicons/icons";
import {IonicReactProps} from "@ionic/react/dist/types/components/IonicReactProps";

interface IonIconProps {
    color?: string;
    flipRtl?: boolean;
    icon?: string;
    ios?: string;
    lazy?: boolean;
    md?: string;
    mode?: 'ios' | 'md';
    name?: string;
    size?: string;
    src?: string;
}

type test =
    IonIconProps
    & IonicReactProps
    & Pick<React.HTMLAttributes<HTMLIonIconElement>, "hidden" | "dir" | "slot" | "title" | "color" | "translate" | "children" | "accessKey" | "draggable" | "lang" | "className" | "id" | "prefix" | "contentEditable" | "inputMode" | "tabIndex" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "contextMenu" | "placeholder" | "spellCheck" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture">
    & React.RefAttributes<HTMLIonIconElement>;

interface Props extends test {
    category: Category;
    isOutline: boolean;
}

const CategoryIcon: React.FC<Props> = ({isOutline, category, ...props}: Props) => {

    const getIcon = (category: Category) => {
        switch (category) {
            case Category.dance:
                return isOutline ? musicalNotesOutline : musicalNotes;
            case Category.club:
                return isOutline ? golfOutline : golf;
            case Category.running:
                return isOutline ? footstepsOutline : footsteps;
            case Category.walking:
                return isOutline ? walkOutline : walk;
            case Category.cycling:
                return isOutline ? bicycleOutline : bicycle;
            case Category.workOut:
                return isOutline ? barbellOutline : barbell;
            case Category.gym:
                return isOutline ? barbellOutline : barbell;
            case Category.tennis:
                return isOutline ? tennisballOutline : tennisball;
            case Category.paddle:
                return isOutline ? boatOutline : boat;
            case Category.hiking:
                return isOutline ? pawOutline : paw;
            case Category.climbing:
                return isOutline ? trendingUpOutline : trendingUp;
            case Category.sailing:
                return isOutline ? boatOutline : boat;
            case Category.fishing:
                return isOutline ? fishOutline : fish;
            case Category.squashing:
                return isOutline ? ellipseOutline : ellipse;
            case Category.swimming:
                return isOutline ? waterOutline : water;
            case Category.sakting:
                return isOutline ? trendingDownOutline : trendingDown;
            case Category.inlineSkating:
                return isOutline ? trendingDownOutline : trendingDown;
            case Category.bridge:
                return isOutline ? removeOutline : remove;
            case Category.badminton:
                return isOutline ? peopleOutline : people;
            case Category.skiing:
                return isOutline ? snowOutline : snow;
            case Category.volleyball:
                return isOutline ? basketballOutline : basketball;
            case Category.soccer:
                return isOutline ? footballOutline : football;
            default:
                return bodyOutline;
        }
    }

    return (
        <IonIcon icon={getIcon(category)} {...props}/>
    );
};

export default CategoryIcon;
