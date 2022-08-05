const subtractArray = (x, y) => x.filter((item) => y.indexOf(`${item}`) < 0);

module.exports.subtractArray = subtractArray;
