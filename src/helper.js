export const moneyFormat = string => {
    let money = Number(string).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });
    return money;
};

export const filterArrayRanges = (items, from, to) => {
    let resultProductData = items.filter(a => {
        var date = new Date(a.date);
        return (date >= from && date <= to);
    });
    return resultProductData;
};