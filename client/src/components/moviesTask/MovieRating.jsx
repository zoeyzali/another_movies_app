import React, { useState } from 'react'
import { Star } from './Star'

export const MovieRating = ( { totalStars, movie } ) => {
    const [starsSelected, starsSelect] = useState( 0 )

    const rateMovie = async () => {
        try {
            const response = await fetch( `${process.env.REACT_APP_BASE_URL}/${movie.id}/rating?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${process.env.REACT_APP_SESSION_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { value: starsSelected } )
            } )
            const result = await response.json()
            if ( result.status_message === "success" )
                starsSelect( movie.account_states.rated.value )
        } catch ( error ) {
            console.log( error, "catchin' error" )
        }
    }

    // console.log( starsSelected, "selected MovieRating" )
    return (
        <div className="star__rating">

            {[...Array( totalStars )].map( ( n, i ) => (
                <Star
                    key={i}
                    selected={i < starsSelected ? i < starsSelected : i < movie.account_states.rated.value}
                    onClick={() => starsSelect( i + 1 ) ? starsSelect( i + 1 ) : rateMovie()}
                />
            ) )}
        </div>
    )
}


/**
                        {movie.account_states.rated ? ( <div className="">
                            {movie.account_states.rated.value}
                        </div>
                        ) : (
                                ""
                            )
                        }
            <button onClick={rateMovie}>Rate it!</button>
                */