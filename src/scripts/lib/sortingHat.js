import React from 'react';

export default class SortingHat extends React.Component {
  static merge(left, right) {
    const result = [];

    while (left.length && right.length) {
      if (parseInt(left[0].innerHTML, 10) <= parseInt(right[0].innerHTML, 10)) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    while (left.length) { result.push(left.shift()); }

    while (right.length) { result.push(right.shift()); }

    return result;
  }

  static mergeSort(arr) {
    if (arr.length < 2) { return arr; }

    const middle = parseInt(arr.length / 2, 10);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle, arr.length);

    return SortingHat.merge(SortingHat.mergeSort(left), SortingHat.mergeSort(right));
  }

  static isEmptyObject(obj) {
    for (const prop in obj) { //eslint-disable-line
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  }
  constructor(props) {
    super(props);
    this.state = {
      // error: false
    };
  }
  componentDidMount() {
    // if (!this.state.error)
    // this.setup();
  }
  render() {
    return <div>hi</div>;
  }
}
