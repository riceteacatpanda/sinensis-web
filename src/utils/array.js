export function randomChoice(list) {
    return list[(Math.random() * list.length)|0];
}

export function range(len) {
    let array = [];
    for (let i = 0; i < len; i++) {
        array.push(i);
    }
    return array;
}

/**
 * Counts items in list for value predicate (default identity). Sorted decending
 */
export function countBy(list, predicate = x => x) {
    const categories = [];
    for (let i = 0; i < list.length; i++) {
        if (!list[i].category) continue;
        const categoryIndex = categories.findIndex(c => c[0] === predicate(list[i]));
        if (categoryIndex === -1) {
            categories.push([predicate(list[i]), 1]);
        } else {
            categories[categoryIndex][1] += 1;
        }
    }

    return categories.sort((a, b) => b[1] - a[1]);
}
