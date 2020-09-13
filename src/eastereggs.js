window.getAllFlags = ((a, b, c, d) => () => {
    a[b](c,d);window.location.reload();
})(localStorage, 'setItem', 'prefer-theme', 'jubie');

export function start() {
    console.warn(`debug(admin): window.getAllFlags() failed with 503. Try rerunning in the console.`);
}
