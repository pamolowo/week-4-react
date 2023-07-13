import React from 'react'
import { useNavigate } from 'react-router'
import '../moreInfo.css'

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='not-found'>
            <h1>
                Not Found
            </h1>
            <p>We couldn't find the page you are looking for
                but we have more movies for you to watch
            </p>
            <div className='not-found-btn'>
                <button onClick={() => navigate('')}>Go Home</button>
            </div>
        </div>
    )
}

export default NotFound