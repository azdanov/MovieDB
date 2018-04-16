// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

export type MovieType = {
  vote_count: number,
  id: number,
  video: boolean,
  vote_average: number,
  title: string,
  popularity: number,
  poster_path: string,
  original_language: string,
  original_title: string,
  genre_ids: number[],
  backdrop_path: string,
  adult: boolean,
  overview: string,
  release_date: string,
};

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = ({ movie }: { movie: MovieType }) => (
  <Link to={`/${movie.id}`}>
    <Overdrive id={`${movie.id}`}>
      <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
    </Overdrive>
  </Link>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export const Poster = styled.img`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;
