// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Movie from './Movie';

import type { MovieType } from './Movie';

type Props = {};
type State = {
  movies: MovieType[],
};

class MoviesList extends PureComponent<Props, State> {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const dbApi = process.env.REACT_APP_THE_MOVIE_DB_API
      ? process.env.REACT_APP_THE_MOVIE_DB_API
      : '';
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${dbApi}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
      );
      const movies: MovieType[] = res.data.results;
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        movies,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <MovieGrid>
        {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
