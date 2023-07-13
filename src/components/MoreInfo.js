import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Character from './Character';
import {Spinner} from './Spinner';
import { HeaderLogo } from './HeaderLogo'
import Planets from './Planets';
import Species from './Species';
import Starships from './StarShips';
import Vehicles from './Vehicles';
import "../moreInfo.css"


const MoreInfo = () => {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);

    const { index } = useParams();

    useEffect(() => {
        fetch(`https://swapi.dev/api/films/${index}`)
        .then((response) => {
            if(!response.ok) {
                throw new Error(`This is an HTTP Error: the status is ${response.status}`)
            }
            return response.json()
        })
        .then((data) => {
            setInfo(data)
            setError(null)
        })
        .catch((error) => {
            setError(error)
            setInfo(null)
        })
        .finally(() => setLoading(false))
    })

  return (
    <div className='main-body'>
        <HeaderLogo/>
        <div className='box'>
        <div>
            <div className='section-1'>
                <Link className='back' to='/'>&larr; Back to list</Link>
                {loading && <Spinner />}
                {error && <h3>{`There is a problem fetching your data - ${error}`}</h3>}

                <div className='title-block'>
                    {info && <div>
                        <h2>{info.title}</h2>
                        <p>Director: {info.director}</p>
                        <p>Producer: {info.producer}</p>
                    </div> }
                </div>
            </div>
            {info && <div className='description' >
                <p className='sub-head'>Description</p>
                <p >{info.opening_crawl}</p>
            </div> }
            {info?.characters?.length && (
                <div className='block'>
                    <p className='sub-head'>Characters</p>
                    <ul className='character-list'>
                        {
                            info.characters.map(character => (
                                <Character url={character} key={character}>
                                    {character}
                                </Character>
                            ))
                        }
                    </ul>
                </div>
            )}
            {info?.planets?.length && (
                <div className='block'>
                <p className='sub-head'>Planets</p>
                    <ul className='planet-list'>
                        {
                            info.planets.map(planet => (
                                <Planets url={planet} key={planet}>{planet}</Planets>
                            ))
                        }
                    </ul>
                </div>
            )}
            {info?.species?.length && (
                <div className='block'>
                <p className='sub-head'>Species</p>
                    <ul className='species-list'>
                        {
                            info.species.map(species => (
                                <Species url={species} key={species}>{species}</Species>
                            ))
                        }
                    </ul>
                </div>
            )}
            {info?.starships?.length && (
                <div className='block'>
                <p className='sub-head'>Starships</p>
                    <ul className='starship-list'>
                        {
                            info.starships.map(starships => (
                                <Starships url={starships} key={starships}>{starships}</Starships>
                            ))
                        }
                    </ul>
                </div>
            )}
            {info?.vehicles?.length && (
                <div className='block'>
                <p className='sub-head'>Vehicles</p>
                    <ul className='vehicle-list'>
                        {
                            info.vehicles.map(vehicles => (
                                <Vehicles url={vehicles} key={vehicles}>{vehicles}</Vehicles>
                            ))
                        }
                    </ul>
                </div>
            )}
        </div>
        </div>
    </div>
  )
}

export default MoreInfo;
        
  