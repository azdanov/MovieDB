// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import axios from 'axios';
import { Poster } from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

type MovieDetails = {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: {
    backdrop_path: string,
    id: number,
    name: string,
    poster_path: string,
  },
  budget: number,
  genres: [
    {
      id: number,
      name: string,
    },
  ],
  homepage?: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: [
    {
      id: number,
      logo_path?: string,
      name: string,
      origin_country: string,
    },
  ],
  production_countries: [
    {
      iso_3166_1: string,
      name: string,
    },
  ],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: [
    {
      iso_639_1: string,
      name: string,
    },
  ],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
};
type Props = {
  match: {
    params: { id: number },
  },
};
type State = {
  movie?: MovieDetails,
};

class MovieDetail extends Component<Props, State> {
  state = {
    movie: undefined,
  };

  async componentDidMount() {
    const movieId = String(this.props.match.params.id);
    const dbApi = process.env.REACT_APP_THE_MOVIE_DB_API
      ? process.env.REACT_APP_THE_MOVIE_DB_API
      : '';
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${dbApi}&language=en-US`,
      );
      const movie: MovieDetails = res.data;
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        movie,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie } = this.state;

    if (!movie) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={`${movie.id}`}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;

const Loading = styled.p`
  padding: 2em;
  font-size: 2em;
`;
