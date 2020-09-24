import React, { useState, useEffect } from 'react'
import './movies.css'
import { Link } from 'react-router-dom'
import { useModal } from '../../utils/useModal'
import { ShuffleModal } from './ShuffleModal'

export const MoviesList = ( props ) => {
    const [loading, setLoading] = useState( true )
    const posterUrl = `https://image.tmdb.org/t/p/w342`

    const [data, setData] = useState( { movies: null, moreMovies: null } )
    const { isOpen, toggleModal } = useModal()
    const [toggleLoad, setToggleLoad] = useState( false )

    // A cleaner way of chaining API calls
    // const [respGlobal, respRepos] = await Promise.all( [axios( api.github.com/users/${ username } ), 
    // axios( api.github.com/users/${ username }/repos )] )

    const tmbdKey = process.env.REACT_APP_TMDB_KEY
    const url = "https://api.themoviedb.org"

    useEffect( () => {
        const fetchMovies = async () => {
            setLoading( true )
            const response = await fetch( `${url}/4/list/139797?page=1&sort_by=vote_average.desc&api_key=${tmbdKey}` )
            const result = await response.json()
            // console.log( result, "result" )

            const loadMore = await fetch( `${url}/3/discover/movie?api_key=${tmbdKey}&language=en-US&sort_by=popularity.desc&include_adult=false& include_video=false&page=1&vote_average.gte=8&without_genres=35,14with_keywords=drama,family&with_genres=18` )
            const movies = await loadMore.json()
            setLoading( false )
            setData( { movies: result.results, moreMovies: movies.results } )
        }
        fetchMovies()
        // eslint-disable-next-line
    }, [] )
    // console.log( data.movies, "all data", data.moreMovies )

    const { movies, moreMovies } = data

    const appendLoadMovies = () => {
        setLoading( true )
        setTimeout( () => {
            if ( moreMovies ) {
                setLoading( false )
            }
        }, 1000 )
        setToggleLoad( !toggleLoad )
    }

    const confirmCloseModal = () => {
        props.history.push( '/movies' )
    }


    if ( loading ) {
        return (
            <div className="loading__wrapper"
                style={{ display: "flex", flexDirection: "column", fontSize: "1.5em" }}>
                <p> ...LOADING</p>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="movies__wrapper">
                <div className="movies__list">
                    {movies && movies.length > 0 &&
                        movies.map( movie => {
                            return (
                                <Link to={`/movies/${movie.id}`} key={movie.id}>
                                    <div className="movies__card">
                                        <span className="rating__label">
                                            {movie.vote_average}
                                        </span>
                                        <img src={`${posterUrl}/${movie.poster_path}`} alt={movie.title}
                                            className="card__img"
                                        />
                                        <p>
                                            {movie.title}{" "}
                                            <span>({movie.release_date.slice( 0, 4 )})</span>
                                        </p>
                                        <p>
                                            <span>Language</span>
                                            ({movie.original_language})</p>
                                    </div>
                                </Link>
                            )
                        } )
                    }
                    {toggleLoad && moreMovies ? moreMovies.map( movie => {
                        // console.log( movie, "movie--" )
                        return (
                            <Link id={`/#moreMoviess/`} to={`/movies/${movie.id}`} key={movie.id}>
                                <div id={`/#moreMovies ${movie.id}`} className="movies__card">
                                    <span className="rating__label">
                                        {movie.vote_average}
                                    </span>
                                    <img src={`${posterUrl}/${movie.poster_path}`} alt={movie.title}
                                        className="card__img"
                                    />
                                    <p>
                                        {movie.title}{" "}
                                        <span>
                                            ({movie.release_date.slice( 0, 4 )})</span>
                                    </p>
                                    <p>
                                        <span>Language</span>
                                        ({movie.original_language})
                                        </p>
                                </div>
                            </Link>
                        )
                    } ) : ""}
                </div>
                <div className="btn__row">
                    <button to="/movies/#moreMovies" className="load__btn"
                        onClick={() => appendLoadMovies( toggleLoad => !toggleLoad )}>{`${!toggleLoad ? "Load" : "Go Back"}`}
                    </button>
                    <button className="shuffle__btn" onClick={toggleModal}>
                        Shuffle</button>
                </div>
            </div>
            <ShuffleModal
                isOpen={isOpen}
                hide={toggleModal}
                closeModals={confirmCloseModal} />
        </div>
    )
}
