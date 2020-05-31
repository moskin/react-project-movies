import React from "react";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../utils/api";
import MovieTabs from "./MovieTabs";
import MovieListWillWatch from "./MovieListWillWatch";
import '../stylesheets/MovieListStyle.css'
import {Button, Form, FormControl, Navbar, Pagination} from "react-bootstrap";
import MoviesPagination from "./Pagiantion";

class MovieList extends React.Component {
    state = {
        movies: [],
        moviesWillWatch: [],
        sort_by: 'popularity.desc',
        search: '',
        currentPage: 1,
        totalPages: 500,
        // isLoading: false
    };

    componentDidMount() {
        this.setState({isLoading: true});
        this.getMovies();
    }

    componentDidUpdate(prevProps, prevState) {
        return prevState.sort_by !== this.state.sort_by ||
        prevState.currentPage !== this.state.currentPage
            ? this.getMovies()
            : false;
    }

    getMovies = () => {
        fetch(
            `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.currentPage}`
        )
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data.results,
                    isLoading: false,
                    totalPages: data.total_pages,
                });
            });
    };

    deleteMovie = movie => {
        // console.log(movie.id);
        const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
        // console.log(updateMovies);

        // this.state.movies = updateMovies;
        this.setState({
            movies: updateMovies
        });
    };

    addMovieToWillWatch = movie => {
        const updateMoviesWillWatch = [...this.state.moviesWillWatch];
        updateMoviesWillWatch.push(movie);

        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        });
    };

    deleteMovieFromWillWatch = movie => {
        const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
            item => item.id !== movie.id
        );

        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        });
    };

    updateSortBy = value => {
        this.setState({
            sort_by: value
        })
    };

    handleInputChange = (e) => {
        this.setState({search: e.target.value.toLowerCase()});
    };

    searchMovies = () => {
        // https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
        fetch(`${API_URL}/search/movie?api_key=${API_KEY_3}&query=${this.state.search}`)
            .then((response) => {
                return response.json()
            }).then((data) => {
            this.setState({
                movies: data.results,
                search: ''
            })
        });
    }

    changeCurrentPage = (value) => {
        if (value > 0) {
            this.setState({
                currentPage: value,
            });
        }
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.searchMovies(this.state.search)
            console.log('do validate')
        }
    }

    render() {

        console.log(this.state)
        const isMovieEmpty = this.state.movies && this.state.movies.length;

        return (
            <div>
                <Navbar bg="dark" variant="dark">

                    {/*<Form inline>*/}
                    <div className='formSearch'>
                        <FormControl onKeyDown={this.handleKeyDown}
                                     type="text"
                                     placeholder="Type here..."
                                     className="mr-sm-2"
                                     onChange={this.handleInputChange} value={this.state.search}
                                     style={{backgroundColor: 'inherit', color: 'white'}}
                        />
                        <Button
                            variant="outline-info"
                            onClick={this.searchMovies}
                        >Search</Button>
                    </div>
                    {/*</Form>*/}
                    <img src={require('../momo/vector/default-monochrome-white2.svg')} className='logo'/>
                    <MoviesPagination
                            currentPage={this.state.currentPage}
                            totalPages={this.state.totalPages}
                            changeCurrentPage={this.changeCurrentPage}
                    />
                </Navbar>


                <div className='main'>
                    <div>
                        <MovieTabs sort_by={this.state.sort_by}
                                   updateSortBy={this.updateSortBy}/>
                    </div>

                    <div className={'grid'}>

                        {isMovieEmpty ? this.state.movies && this.state.movies.map(movie => {
                            if (movie.poster_path || movie.backdrop_path) {
                                return (
                                    <div key={movie.id}>
                                        <MovieItem
                                            data={movie}
                                            deleteMovie={this.deleteMovie}
                                            addMovieToWillWatch={this.addMovieToWillWatch}
                                            deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                                            moviesWillWatch={this.state.moviesWillWatch}
                                        />
                                    </div>
                                );
                            }
                        }) : <span className='clearRequestMessage'>NO SUCH RESULTS FOUND <br/> TRY ANOTHER ONE</span>}
                    </div>
                    <div className={'willWatchList'}>
                        <MovieListWillWatch moviesWillWatch={this.state.moviesWillWatch}/>
                    </div>
                </div>


                <Navbar bg="dark" variant="dark">
                    <img src={require('../momo/vector/footer-monochrome-white.svg')} className='logo-footer'/>
                </Navbar>
            </div>
        );
    }
}

export default MovieList;