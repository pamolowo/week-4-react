import React from 'react'
import { useEffect, useState } from 'react';
import {Spinner} from "./Spinner"


const Character = ({url}) => {
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState(null);
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
        setCharacter(data)
        setError(null)
      })
      .catch((error) => {
        setError(error)
        setCharacter(null)
      })
      .finally(() => setLoading(false));
  }, [url])

  return (
    <div>
      <li>
        {loading && <Spinner/>}
        {error && `Unable to fetch character! - ${error}`}
        {character && character.name}
      </li>
    </div>
  )
}

export default Character;