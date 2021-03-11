import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original';

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // snippet of code that runs on a specific condition
    // runs when the row loads
    useEffect( () => {
        // if [] blank, then run once when row loads, and don't run again

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();

    }, [fetchUrl] );

    //console.table(movies);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {autoplay: 1}
    };

    const handleClick = (movie) => {
        console.log(`movie.title = ${movie?.name || movie?.title}`);

        
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            
            movieTrailer(movie?.name || movie?.title || "")
            .then(url => {
                console.log(`url = ${url}`);
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
                console.log(`trailerUrl = ${trailerUrl}`);
            })
            .catch((error) => {
                console.log(error);
            });
        }


    };

    return (
        <div className="row">
            <h2>{title}</h2>
            
            <div className="row_posters"> 
                {/* several row_poster(s) */}

                {movies.map(movie => (
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} />
                ))}
            </div>
            
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
            
        </div>
    )
}



export default Row
