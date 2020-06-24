import * as React from "react";
import "./App.css";
import { getMovies, MovieDetails } from "./api";

import MovieDisplay from "./movieDisplay/MovieDisplay";

export default function App() {
  // Structure the code however you'd like.
  // Display a search box with a submit button.
  // When a search term is entered and the submit button is clicked:
  // Fetch movies whose title matches the search term from the open movie database (http://www.omdbapi.com/) using API Key 60f47463
  // If you encounter problems with the provided API key, please register for your own.
  // Display each of the results in a list/table that should show (any order/format - be creative!):
  // 1. The movie title
  // 2. The image/poster for the movie
  // 3. The MPAA rating
  // 4. The runtime length
  // 5. The Rotten Tomatoes score, if available.

  const [loading, setLoading] = React.useState<boolean>(false);
  const [haveSearched, setHaveSearched] = React.useState<boolean>(false);
  const [titleTerm, setTitleTerm] = React.useState<string>("");
  const [movies, setMovies] = React.useState<MovieDetails[]>([]);
  const [selectedTitles, setSelectedTitles] = React.useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleTerm(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHaveSearched(false);
    setLoading(true);
    setMovies(await getMovies(titleTerm));
    setSelectedTitles([]);
    setLoading(false);
    setHaveSearched(true);
  };

  const toggleSelection = (movie: MovieDetails): void => {
    // console.log(`${movie.Title} was clicked`);
    const index = selectedTitles.indexOf(movie.Title);
    let newList = [...selectedTitles];
    if (index >= 0) {
      // de-select
      newList.splice(index, 1);
    } else if (index < 0) {
      // select
      newList.push(movie.Title);
    }
    setSelectedTitles(newList);
  };

  const movieList = movies.map((movie) => (
      <li key={movie.imdbID}>
        <MovieDisplay movie={movie} toggle={toggleSelection} />
      </li>
  ));

  const selectedTitleList = selectedTitles.map((title) => (
      <li key={title}>{title}</li>
  ));

  return (
      <div>
        <h1>Movie Search</h1>

        <div>
          <ul>{selectedTitleList}</ul>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="titleTerm">Title</label>
          <input
              className="u-full-width"
              type="text"
              id="titleTerm"
              name="titleTerm"
              value={titleTerm}
              onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>

        {loading && (
            <img
                id="loadingImage"
                src="https://i.imgur.com/LVHmLnb.gif"
                alt="loading"
            />
        )}
        <section className="movies">
          <ul className="movie-list">{movieList}</ul>
        </section>
        {(haveSearched && movies.length === 0) && (
            <div>
              Your search for [{titleTerm}] did not find any matches!
            </div>
        )}
      </div>
  );
}
