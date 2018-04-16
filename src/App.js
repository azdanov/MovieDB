// @flow

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import MoviesList from './MoviesList';
import MovieDetail from './MovieDetail';

import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/" className="App-title">
          <h1>MovieDB</h1>
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;
