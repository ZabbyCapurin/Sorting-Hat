// import 'airbnb-browser-shims';
// import 'es6-promise';
// import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import SortingHat from '../lib/sortingHat';

const app = (a, b) => a + b;

render(
  <SortingHat />,
  document.getElementById('root'),
);
