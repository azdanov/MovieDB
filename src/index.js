// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const root = document.getElementById('root');

if (!process.env.REACT_APP_THE_MOVIE_DB_API) {
  console.error('Please specify THE_MOVIE_DB_API environment variable.');
}
if (root) {
  ReactDOM.render(<App />, root);
}
