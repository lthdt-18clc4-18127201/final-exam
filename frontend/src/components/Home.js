import React from 'react'
import GoogleMap from './google/GoogleMap'

const Home = () => {
    const position = {
        lat: 10.743180,
        lng: 106.658089
    }
    
    return (
        <GoogleMap position={position}/>
    )
}

export default Home