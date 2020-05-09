import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const RouletteResults = ( props ) => {

    const [data, setData] = useState( [] )
    const posterUrl = `https://image.tmdb.org/t/p/w185`
    const [loading, setLoading] = useState( false )
    const [selectedGenre, setSelected] = useState()
    const [count, setCount] = useState( 0 )


    useEffect( () => {
        const loadData = async () => {
            setLoading( true )
            const genresRes = await fetch( `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&vote_average.gte=8&vote_count.gte=100&with_genres=${props.id}
    `)
            const genresJson = await genresRes.json()
            // console.log( genresJson.results[0].genre_ids[0], "api results" )
            setLoading( false )
            if ( genresJson.results.length > 0 ) {
                let maxNr = genresJson.results.length / 10
                setCount( maxNr )
                genresJson.results.length = maxNr
                setData( [...genresJson.results] )
            }
            // console.log( data, "divided/maxNr" )
        }
        loadData()
        // eslint-disable-next-line
    }, [props.id] )


    // console.log( props, count, "props roulette-results" )

    // const filterByGenre = ( id ) => {
    //     const filtered = props.genres.filter( genre => genre.id === id)
    //     const tempCurrent = filtered.length > 0 ? filtered[0] : null
    //     setGenre( tempCurrent )
    //     console.log( tempCurrent, "temp/currentGenre", filtered )
    // }
    // console.log( genre, "genre" )


    const userPickedGenre = ( id ) => {
        const shuffledGenres = data.filter( genre => genre.id === id )
        const tempSelected = shuffledGenres.length > 0 ? shuffledGenres[0] : null
        console.log( tempSelected, "temp" )
        setSelected( tempSelected )
    }


    const mapList = () => {
        const mapped = data.map( film => {
            // console.log( film, "film" )
            return (
                <div key={film.id}>
                    <Link to={`/movies/${film.id}`} onClick={() => userPickedGenre( film.id )}>
                        <img src={`${posterUrl}/${film.poster_path}`} alt={film.title} />
                    </Link>
                </div>
            )
        } )
        return mapped
    }



    return (
        <>
            {loading && <div className="loading__wrapper"><p>...loadin'</p></div>}
            {props.id === null || props.id === 0 || props.id === "" ? "" : selectedGenre}
            {selectedGenre === null ? selectedGenre : mapList()}
        </>
    )
}



// onClick={( id ) => filterByGenre( id )}






