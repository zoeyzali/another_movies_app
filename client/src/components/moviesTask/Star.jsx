import React from 'react'

export const Star = ( { selected = false, rated = true, onClick = f => f } ) => {
    // console.log( selected, "selected", rated )
    return (
        <div className={selected && rated ? "star selected" : "star"} onClick={onClick} />
    )
}
