import React from 'react'
import { useEffect, useState } from 'react';
import {Spinner} from "./Spinner"


const Planets = ({url}) => {
    const [loading, setLoading] = useState(false);
    const [planet, setPlanet] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`This is an HTTP Error: the status is ${response.status}`)
            }
            return response.json()
          })
          .then((data) => {
            setPlanet(data)
            setError(null)
          })
          .catch((error) => {
            setError(error)
            setPlanet(null)
          })
          .finally(() => setLoading(false))
        }, [url])
 return (
    <div>
        <li>
            {loading && <Spinner/>}
            {error && `Unable to fetch Planets! - ${error}`}
            {planet && planet.name}
      </li>
    </div>
  )
}

export default Planets;