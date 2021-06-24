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

export const reverseArr = (input) => {
    var ret = new Array;
    for (var i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}