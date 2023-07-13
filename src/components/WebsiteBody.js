import React, { useState, useEffect } from 'react'
import { HeaderLogo } from './HeaderLogo';
import { Spinner } from './Spinner';
import '../App.css';
// import { MoreInfo } from './MoreInfo';
import {Link} from "react-router-dom"


// https://swapi.dev/api/films

export const WebsiteBody = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`https://swapi.dev/api/films`)
        .then((response) => {
            if(!response.ok){
                throw new Error(`This is an HTTP error: The status is ${response.status}`)
            }
            return response.json()
        })
        .then((actualData) => {
            // console.log(actualData.results)
            setData(actualData.results)
            setError(null)
        })
        .catch((error) => {
            console.log(error)
            setError(error)
            setData(null)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

  return (
    <div>
    <HeaderLogo/>
    {loading && <Spinner/>}
    <div className='container'>
        {error && <div>{`There is a problem fetching the data - ${error}`}</div>}
            {data && data.map((results, index) => {
                return(<div className='movie-card-container' key ={results.episode_id}>
                    <div className='movie-card'>
                        <h2 className='title'>
                           <a href='#movie'> {results.title}</a>
                        </h2>
                        {/* <p className='date'>{results.release_date}</p> */}
                        <p className='date'>{new Date(results.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div className='two'>
                        <p className='opening-crawl'>{results.opening_crawl}</p>
                    </div>
                    <div className='info-link'>
                          <Link to={'/more/' + (index+1)}>More Info</Link>
                        </div>
                    </div>
                )
            })}
    </div>
    </div>
  )
}

export default WebsiteBody;