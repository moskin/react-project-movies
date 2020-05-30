import React from "react";
import '../stylesheets/MovieItemStyle.css'
import {Button, Card} from "react-bootstrap";

class MovieItem extends React.Component {
    state = {
        willWatch: false
    };

    render() {
        const {
            data,
            deleteMovie,
            addMovieToWillWatch,
            deleteMovieFromWillWatch,
            moviesWillWatch
        } = this.props;
        // props.data = {};


        return (
            <Card style={{ width: '18rem', backgroundColor: '#bec8ce'}}>
                <div className='test'>
                    <Card.Img
                        variant="top"
                        // className="card-image"
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path || data.backdrop_path}`}
                        alt=""
                    />
                </div>
                <Card.Body className="card-item-body">
                    <Card.Title>{data.title.length >= 20 ? data.title.slice(0, 20)+ '...' : data.title}</Card.Title>

                    <Card.Text>Rating: {data.vote_average}</Card.Text>
                    <Card.Text>Release date: {data.release_date}</Card.Text>

                    <div className='buttons'>
                        <div className="addRemoveButton">
                            {(moviesWillWatch.some(item => item.id === data.id)) ? (
                                <Button
                                    type="button"
                                    className="btn btn-info myButton"
                                    onClick={() => {
                                        deleteMovieFromWillWatch(data);
                                    }}
                                >
                                    Remove
                                </Button>
                            ) : (
                                <Button variant="success"
                                        type="button"
                                        className="btn btn-info myButton"
                                        onClick={() => {
                                            addMovieToWillWatch(data);
                                        }}
                                >
                                    Add to List
                                </Button>
                            )}
                        </div>
                        <div className="deleteButton">

                            <Button
                                variant="danger"
                                type="button"
                                onClick={() => {
                                    deleteMovie(data);
                                }}
                            >
                                Delete
                            </Button>
                        </div>

                    </div>
                </Card.Body>
            </Card>

        );
    }
}

export default MovieItem;