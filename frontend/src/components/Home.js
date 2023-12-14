import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const user = useSelector((state) => state.user.user);


    return (
        <div>This is homepage, Hello {user.name}</div>
    )
}

export default Home