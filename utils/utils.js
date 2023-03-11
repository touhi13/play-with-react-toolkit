//string converter
const stringConverter = (strNumber) => {
    let num;

    if (strNumber.endsWith("k")) {
        return num = parseFloat(strNumber) * 1000;
    } else {
        return num = parseFloat(strNumber);
    }
}
module.exports.stringConverter = stringConverter;