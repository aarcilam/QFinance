export const moneyFormat = string => {
    let money = Number(string).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    });
    return money;
};