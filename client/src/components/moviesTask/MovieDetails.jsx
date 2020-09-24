import React, { useState, useEffect } from 'react'
import './movie-details.css'
import { MovieRating } from './MovieRating'


export const MovieDetails = ( { match } ) => {
    const { params: { id } } = match
    // console.log( match, id )
    const [movie, setMovie] = useState()
    const backdropUrl = `https://image.tmdb.org/t/p/w780`
    const [credits, setCredits] = useState( {} )

    useEffect( () => {
        const movieDetails = async () => {
            const response = await fetch( `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${process.env.REACT_APP_SESSION_ID}&append_to_response=account_states,videos,images,credits` )
            const result = await response.json()
            // console.log( result, "movie details res" )
            setMovie( result )
            setCredits( result.credits.crew )
        }
        movieDetails()
    }, [id] )


    return (
        <div className="movies__detail wrapper">
            {movie &&
                <div key={movie.id} className="movies__detail">
                    <div className="content__top">
                        <h1>{movie.original_title}</h1>{" "}
                        <span>({movie.release_date.slice( 0, 4 )})
                        </span>
                        <h3>{movie.title}</h3>
                    </div>

                    {credits.length > 0 && credits.map( crew =>
                        // console.log( crew, "crew" )
                        crew && crew.job === "Director" ?
                            <p key={crew.id} >
                                {crew.name}
                            </p>
                            : ""
                    )}
                    <div className="details__wrapper">
                        <figure>
                            <img src={`${backdropUrl}/${movie.backdrop_path ? movie.backdrop_path : movie.poster_path}`} alt={movie.title}
                            />
                        </figure>
                        <p>{movie.overview}</p>
                    </div>
                    <div className="rating">
                        <MovieRating totalStars={10}
                            movie={movie} id={movie.id}
                        // rated={movie.account_states.rated.value}
                        />
                    </div>
                    <div className="content__headings">
                        <p>Rating:</p>
                        <span>{movie.vote_average}</span>
                    </div>
                    <div className="content__headings">
                        <p>Popularity:
                        </p>
                        <span>{movie.popularity}</span>
                    </div>
                    <div className="content__headings">
                        <p>Language: </p>
                        <span>{movie.original_language}</span>
                    </div>
                    <div className="content__headings">
                        <p>Country:</p>
                        {movie.production_countries && movie.production_countries.length > 0 ?
                            movie.production_countries.map( country => {
                                return (
                                    <span key={country.iso_3166_1}>
                                        {country.iso_3166_1.toUpperCase()}
                                    </span>
                                )
                            } ) : null
                        }
                    </div>
                </div>
            }
        </div>
    )
}
