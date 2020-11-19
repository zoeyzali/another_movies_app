import { useState, useEffect } from 'react'
import { tmdbKey } from './apikey.js'

// Just an example custom hooks
export const useConfig = () => {
    const [baseUrl, setBaseUrl] = useState( [] )

    const tmdbUrls = async () => {
        const res = await fetch( `https://api.themoviedb.org/3/configuration?api_key=${tmdbKey}&append_to_response=images&include_image_language=fr
`)
        const result = await res.json()
        console.log( result, "poster-sizes" )
        setBaseUrl( result.images )
    }

    useEffect( () => {
        tmdbUrls()
    }, [] )

    return baseUrl
}
