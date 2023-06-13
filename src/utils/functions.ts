import {Location} from "../data/models";

export function addOrRemove<T>(array: Array<T>, value: T) {
    var index = array.indexOf(value);

    if (index === -1) {
        array.push(value);
    } else {
        array.splice(index, 1);
    }
    return array;
}

export function updateArray<T>(array: Array<T>, value: T, key: keyof T) {
    let arrayCopy = [...array];
    let find = arrayCopy.find(o => o[key] === value[key]);
    if (find) {
        arrayCopy[arrayCopy.indexOf(find)] = value;
        return arrayCopy;
    }
    return null;
}

export const isDispatchFulfilled = (event: any) => {
    return event.meta?.requestStatus === 'fulfilled';
}

/**
 * Distance in Kilometer
 * */
export function distance(location1: Location | undefined, location2: Location | undefined) {
    if (!location1 || !location2) {
        return -1;
    }
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((location2.latitude - location1.latitude) * p) / 2 +
        c(location1.latitude * p) * c(location2.latitude * p) *
        (1 - c((location2.longitude - location1.longitude) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}