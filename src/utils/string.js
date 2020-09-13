export function trim(string, words) {
    let chars = words * 4;
    if (string.length >= chars) {
        return string.substring(0, words * 4) + "...";
    } else {
        return string;
    }
}

export function hash(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        let chr = string.charCodeAt(i);
        hash = (((hash << 5) - hash) + chr) | 0;
    }
    return hash;
}
