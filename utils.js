const filterByTypePerson = (type) => people.filter(person => typePerson[type] && person instanceof typePerson[type]);

const calculateKeyAverage = (type, key) => {
    const sum = filterByTypePerson(type).reduce((totalAcc, person) => totalAcc + person[key], 0);
    const total = filterByTypePerson(type).length
    return total > 0 ? (sum / total).toFixed(2) : 0;
}

const orderByKey = (key, array) => {
    if (array.every(obj => obj.hasOwnProperty(key))) {
        return array.sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
    }
    return array;
}
