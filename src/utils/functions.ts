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

export function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}