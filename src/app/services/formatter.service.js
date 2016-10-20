/* eslint-disable class-methods-use-this */
export default class Formatter {
  percentage(num, decimals = 2) {
    return `${(num * 100).toFixed(decimals)}%`;
  }

  currency(num, digits = 2) {
    return `$${this.nFormatter(num, digits)}`;
  }

  nFormatter(num, digits = 1) {
    const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'B' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'k' },
    ];
    for (let i = 0; i < si.length; i += 1) {
      if (num >= si[i].value) {
        return (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1')
          + si[i].symbol;
      }
    }
    return num.toString();
  }

  titleCase(item) {
    const uppers = ['Id', 'Tv', 'Sbir/sttr', 'Rpgs', 'Sbir', 'Sttr'];
    const lowers = [
      'A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 'By',
      'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With',
    ];

    let str = item.replace(/([^\W_]+[^\s-]*) */g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

    for (let i = 0, j = lowers.length; i < j; i += 1) {
      str = str.replace(new RegExp(`\\s${lowers[i]}\\s`, 'g'), txt => txt.toLowerCase());
    }

    for (let i = 0, j = uppers.length; i < j; i += 1) {
      str = str.replace(new RegExp(`\\b${uppers[i]}\\b`, 'g'), uppers[i].toUpperCase());
    }

    return str;
  }

  cleanNum(item) {
    const everyThirdNumber = /\B(?=(\d{3})+(?!\d))/g;
    return item.toString().replace(everyThirdNumber, ',');
  }

  twoDecimals(item) {
    return parseFloat(Math.round(item * 100) / 100).toFixed(2);
  }
}
