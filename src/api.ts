const SEARCH_API_URL = "https://www.omdbapi.com/?apikey=7447f16e&type=movie&s=";
const DETAIL_API_URL = "https://www.omdbapi.com/?apikey=7447f16e&i=";

export type MovieMatch = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
};

export type SearchResult = {
    Search: MovieMatch[];
    totalResults: string;
    Response: string;
};

export type Rating = {
    Source: string;
    Value: string;
};

export type MovieDetails = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
};

/**
 * Fetch an array of movies based on the title.
 */
export async function getMovies(title: string): Promise<MovieDetails[]> {
    const response = await fetch(`${SEARCH_API_URL}${title}`);
    const results: SearchResult = await response.json();
    // console.log(`Search got: ${JSON.stringify(results, undefined, "\t")}`);
    if (
        response.status === 200 &&
        results.Response === "True" &&
        results.Search &&
        results.Search.length
    ) {
        // console.log(`Go get details for ${results.Search.length} matches`);
        return Promise.all(
            results.Search.map(async movie => getMovieDetails(movie.imdbID))
        );
    } else {
        // console.error(`Nope!!! ${response.status}`);
        return [];
    }
}

export async function getMovieDetails(imdbId: string): Promise<MovieDetails> {
    // console.log(`Fetching details for ${imdbId}`);
    const response = await fetch(`${DETAIL_API_URL}${imdbId}`);
    const json = await response.json();
    // console.log(`Details got: ${JSON.stringify(json, undefined, "\t")}`);
    return json;
}
