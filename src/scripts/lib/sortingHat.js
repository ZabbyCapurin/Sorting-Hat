import React from 'react';
import CSV from 'comma-separated-values';

import Group from './group';

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

  static groupBy(array, f) {
    const groups = {};
    array.forEach((o) => {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(group => groups[group]);
  }

  static isEmptyObject(obj) {
    for (const prop in obj) { //eslint-disable-line
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
    return true;
  }

  static shuffleArray(array) {
    const arrayCopy = JSON.parse(JSON.stringify(array));
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [array[j], array[i]];
    }
    return arrayCopy;
  }

  constructor(props) {
    super(props);
    this.state = {
      // error: false
      fullStudentInfoRaw: '',
      fullStudentInfo: [],
      groups: 1,
    };
    this.handleCommaDelimitedListOnChange = this.handleCommaDelimitedListOnChange.bind(this);
    this.handleNumGroupsOnChange = this.handleNumGroupsOnChange.bind(this);
  }
  componentDidMount() {
    // if (!this.state.error)
    // this.setup();
  }
  createGroups() {
    const { fullStudentInfo, groups } = this.state;

    const membersHolder = [];
    const groupNum = 1;
    const totalStudents = fullStudentInfo.length;
    const studentsPerGroup = Math.ceil(totalStudents / groups);

    const grouped = SortingHat.groupBy(fullStudentInfo, i => [i.Organization]);

    const allGroups = new Array(groups).fill([]);
    let currGroup = 0;
    for (let orgIndex = 0, orgCount = grouped.length; orgIndex < orgCount; orgIndex += 1) {
      const org = grouped[orgIndex];
      // const shuffledOrg = SortingHat.shuffleArray(org);
      for (let memberIndex = 0, memberCount = org.length; memberIndex < memberCount; memberIndex += 1) {
        const member = org[memberIndex];
        allGroups[currGroup].push(member);
        if (currGroup < groups - 1) {
          currGroup += 1;
        } else {
          currGroup = 0;
        }
      }
    }
    const reactGroups = [];
    for (let x = 0, allGroupsCount = allGroups.length; x < allGroupsCount; x += 1) {
      reactGroups.push(<Group key={x} id={x} members={allGroups[x]} />);
    }
    return reactGroups;
  }

  handleCommaDelimitedListOnChange(e) {
    const data = e.target.value;

    const csv = CSV.parse(data);
    const csvArrayObj = [];
    for (let i = 0, csvLength = csv.length; i < csvLength; i += 1) {
      const curr = csv[i];
      const [firstName, lastName, org] = curr;

      const obj = {};
      obj.id = i;
      obj.FirstName = firstName;
      obj.LastName = lastName;
      obj.Organization = org;
      csvArrayObj.push(obj);
    }
    this.setState({ fullStudentInfoRaw: data, fullStudentInfo: csvArrayObj });
  }
  handleNumGroupsOnChange(e) {
    const groups = e.target.value;
    this.setState({ groups });
  }
  render() {
    const { fullStudentInfoRaw, fullStudentInfo, groups } = this.state;
    const sortedGroups = this.createGroups();
    return (
      <div id="infoHolder">
        <textarea
          id="commaDelimitedList"
          onChange={this.handleCommaDelimitedListOnChange}
          value={fullStudentInfoRaw}
        />
        <br />
        <input id="numGroups" onChange={this.handleNumGroupsOnChange} type="number" step="1" min="1" max="100" value={groups} />
        <br />
        Total Students: {fullStudentInfo.length}
        <br />
        {sortedGroups}
      </div>
    );
  }
}
