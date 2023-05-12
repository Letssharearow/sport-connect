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