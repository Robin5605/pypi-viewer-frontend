export function humanizeSize(size: number) {
    if(size < 1000) {
        return size + " B";
    } else if (size < 1e3 * 999) {
        return Math.floor(size / 1e3) + " KB";
    } else if (size < 1e6 * 999) {
        return Math.floor(size / 1e6) + " MB";
    } else {
        return Math.floor(size / 1e9) + " GB";
    };
}
