import React from 'react'
import './movie-shuffle.css'
import ReactDom from 'react-dom'
import { MovieRoulette } from './MovieRoulette'

export const ShuffleModal = ( { isOpen, hide } ) => (
    isOpen ? ReactDom.createPortal(
        <React.Fragment>
            <div className="modal__overlay" />
            <div className="modal">
                <div className="modal__header">
                    <h3>Movie Roulette</h3>
                </div>
                <MovieRoulette closeModals={hide} />
            </div>
        </React.Fragment>, document.body
    ) : null
)
