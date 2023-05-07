export function addOrRemove<T>(array: Array<T>, value: T) {
    var index = array.indexOf(value);

    if (index === -1) {
        array.push(value);
    } else {
        array.splice(index, 1);
    }
    return array;
}