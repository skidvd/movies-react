import * as React from "react";
import "./styles.css";
import { MovieDetails, Rating } from "../api";

const ROTTEN_TOMATOES = 'rotten tomatoes';

export default function MovieDisplay(props: {
    movie: MovieDetails;
    toggle: Function;
}) {
    const [selected, setSelected] = React.useState<boolean>(false);
    const filteredRatings: Rating[] = props.movie && props.movie.Ratings ?
        props.movie.Ratings.filter((r: Rating) => r.Source.toLowerCase() === ROTTEN_TOMATOES) :
        [];
    const rottenTomatoes = filteredRatings && filteredRatings.length ? filteredRatings[0] : undefined;

    /*
      // 1. The movie title
      // 2. The image/poster for the movie
      // 3. The MPAA rating
      // 4. The runtime length
      // 5. The Rotten Tomatoes score, if available.

    */
    return (
        <div
            onClick={e => {
                e.preventDefault();
                setSelected(!selected);
                props.toggle(props.movie);
            }}
            className={selected ? "selected" : "not-selected"}
        >
            {(props.movie.Poster && props.movie.Poster !== 'N/A') && (
                <img src={props.movie.Poster} alt={props.movie.Title} />
            )}
            <div>
                Title: {props.movie.Title}
            </div>
            <div>
                MPAA Rating: {props.movie.Rated}
            </div>
            <div>
                Runtime: {props.movie.Runtime}
            </div>
            {rottenTomatoes && (
                <div>
                    Rotten Tomatoes score: {rottenTomatoes.Value}
                </div>
            )}
        </div>
    );
}
