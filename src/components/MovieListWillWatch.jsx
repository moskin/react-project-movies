import React from "react";
import '../stylesheets/MovieListWillWatchStyle.css'
import {ListGroup} from "react-bootstrap";

const MovieListWillWatch = (props) => {
    const movies = props.moviesWillWatch;

    return (
        <div className='willwatch-tab'>
            <ListGroup.Item style={{backgroundColor: '#bec8ce', color: 'black'}}>WILL WATCH: {movies.length} movies</ListGroup.Item>
            {movies.map((movie) => {
                return (
                    <ListGroup.Item style={{backgroundColor: 'rgba(23,162,184,0.71)', color: '#f2f2f2'}}
                                    className='willwatch-list-items'
                                    key={movie.id} >
                        <div >
                            <div>{movie.title}</div>
                            <div>
                                <span className='movie-name-willwatch'>Movie Rating: </span>
                                {movie.vote_average}
                            </div>
                        </div>
                    </ListGroup.Item>
                );
            })}
        </div>
    );
};

export default MovieListWillWatch;