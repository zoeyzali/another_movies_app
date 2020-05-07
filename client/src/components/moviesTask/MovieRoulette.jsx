import React, { useState } from 'react'
import { genresList } from '../../utils/genresList'
import { RouletteResults } from './RouletteResults'


export const MovieRoulette = ( props ) => {
    const [state, setState] = useState( {
        genres: genresList,
        isSelected: "",
        currentGenre: "",
        elMssg: ""
    } )

    const closeModals = () => {
        props.closeModals()
    }
    // console.log( props, "props" )

    const handleSelected = ( e ) => {
        let genreId = e.target.id
        setState( {
            ...state,
            isSelected: e.target.value,
            currentGenre: Number( genreId )
        } )
        // console.log( e.target.id, e.target.value, "e target id & value", genreId )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()
        let mssg = ( `You clicked on ${state.isSelected} & currentGenre is ${state.currentGenre}` )
        setState( {
            ...state,
            elMssg: mssg,
            isSelected: state.isSelected
        } )
    }

    return (
        <React.Fragment>
            <div className="modal__body">
                <div>{state.isSelected && state.elMssg}</div>
                <form onSubmit={handleSubmit}>
                    <h4>Select a genre</h4>
                    {state.genres.map( ( genre ) => {
                        return (
                            <React.Fragment
                                key={genre.id}>
                                <input
                                    id={genre.id}
                                    type="radio"
                                    // name={genre.name}
                                    value={genre.name}
                                    checked={state.isSelected === genre.name}
                                    onChange={( id ) => handleSelected( id )}
                                />
                                <label htmlFor={genre.id}>
                                    {genre.name}</label>
                                <br />
                            </React.Fragment>
                        )
                    } )}
                    <div className="btn__row">
                        <button className="add__btn">
                            ROLL
                    </button>
                        <button className="shuffle__btn"
                            onClick={closeModals}
                        >
                            Close
                        </button>
                    </div>
                </form>
                <RouletteResults
                    genreSelected={state.isSelected}
                    genres={state.genres}
                    id={state.currentGenre}
                />
            </div>
        </React.Fragment>
    )
}





//{state.genres && filterByGenre()}
// { state.isSelected }


// {state.currentGenre !== null ? state.currentGenre : ""}
//**     let id
// const filteredGenre = genresList.filter( genre => Object.values( genre ) )
//     .map( ( singleGenre, i ) => {
//         console.log( "singleGenreObjVal=>", Object.values( singleGenre ) )
//         console.log( i, "index" )
//         if ( Object.values( singleGenre )[i] === i ) {
//             Object.values( singleGenre )[i] = id
//         }
//         setState( { isSelected: singleGenre[i] } )
//     } )

