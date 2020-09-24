import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { genresList } from '../../utils/genresList'

export const RouletteResults = ( props ) => {
    const [data, setData] = useState()
    const posterUrl = `https://image.tmdb.org/t/p/w185`
    const [loading, setLoading] = useState( false )
    const [selectedGenre, setSelected] = useState( null )
    // const [count, setCount] = useState( 0 )
    // const [current, setCurrent] = useState()

    // Experimental/to be fixed
    useEffect( () => {
        const loadData = async () => {
            setLoading( true )
            const genresRes = await fetch( `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=8&vote_count.gte=10&with_genres=${props.id}
    `)
            const genresJson = await genresRes.json()
            setLoading( false )
            // console.log( genresJson.results[0].genre_ids[0], "api results" )
            //     }
            // if ( genresJson.results.length > 0 ) {
            //     let maxNr = genresJson.results.length / 10
            //     setCount( maxNr )
            //     genresJson.results.length = maxNr
            //     setData( [...genresJson.results] )
            //     let genre = genresJson.results[0].genre_ids
            //     for ( let i = 0; i < genre.length; i++ ) {
            //         // console.log( genre[i], "indx", genre )
            //         // console.log( i, "i" )
            //         setCurrent( genre[i] )
            // }
            // setData( [...genresJson.results] )
            setData( genresJson.results[getRandom( genresJson.results.length )] )
            // setSelected( data )
        }
        loadData()
        // eslint-disable-next-line
    }, [props.id] )

    console.log( selectedGenre, "selected genre?" )
    // const roll = () => {
    //     const genreIds = Array.from( newData.pickedGenres )
    //     const movies = setData( genreIds )
    //     const movie = movies[getRandom( movies.length )]
    // }



    // const userPickedGenre = ( id ) => {
    //     const shuffledGenres = data.filter( genre => genre.id === id )
    //     const tempSelected = shuffledGenres.length > 0 ? shuffledGenres[0] : null
    //     console.log( tempSelected, "temp", shuffledGenres )
    //     // setSelected( tempSelected )
    //     // setCurrent( [...tempSelected.genre_ids, current[0]] )
    // }
    // console.log( data, "data" )

    const getRandom = ( max ) => {
        return Math.floor( Math.random() * max - 1 )
    }

    const mapList = () => {
        const mapped = data && Object.values( data ) ? <div key={data.id}>
            <Link to={`/movies/${data.id}`} >
                <img src={`${posterUrl}/${data.poster_path}`} alt={data.title} />
            </Link>
        </div>
            : ""
        return mapped
    }


    return (
        <React.Fragment>
            {loading && <div className="loading__wrapper">
                <p>...Loadin'</p>
            </div>
            }
            {selectedGenre === null ? setSelected( "Selected a genre" ) : mapList()}
        </React.Fragment>
    )
}








