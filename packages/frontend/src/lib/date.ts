export const dateToYYMMDD = (unix: number): string => {
    const date = new Date(unix);
    const y = date.getFullYear();
    const m = ('00' + (date.getMonth() + 1)).slice(-2);
    const d = ('00' + date.getDate()).slice(-2);
    return y + '/' + m + '/' + d;
};
