import React from "react";
import '../stylesheets/MovieTabsStyle.css'
import {ListGroup} from "react-bootstrap";

class MovieTabs extends React.Component {

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log('MovieTabs willReceiveProps')
        // console.log('nextProps sort_by')
        // console.log('previousProps sort_by')
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.sort_by !== this.props.sort_by) {
            return true;
        } else {
            return false
        }
    }

    render() {
        const {sort_by, updateSortBy} = this.props;
        const handleClick = value => {
            return event => {
                updateSortBy(value)
            }
        };
        const getClassLink = value => {
            return `navigation-item ${sort_by === value ? 'active' : ''}`
        };

        // console.log("MovieTabs render")

        return (
            <ListGroup>
                <ListGroup.Item  style={{backgroundColor: '#bec8ce', color: 'black'}}>
                    <div
                        className={getClassLink('popularity.desc')}
                        onClick={handleClick('popularity.desc')}
                    >
                        POPULARITY
                    </div>
                </ListGroup.Item  >
                <ListGroup.Item  style={{backgroundColor: '#bec8ce', color: 'black'}}>
                    <div
                        className={getClassLink('revenue.desc')}
                        onClick={handleClick('revenue.desc')}
                    >
                        REVENUE
                    </div>
                </ListGroup.Item>

                <ListGroup.Item  style={{backgroundColor: '#bec8ce', color: 'black'}}>
                    <div
                        className={getClassLink('vote_count.desc')}
                        onClick={handleClick('vote_count.desc')}
                    >
                        VOTE LEADERS
                    </div>
                </ListGroup.Item>

                <ListGroup.Item  style={{backgroundColor: '#bec8ce', color: 'black'}}>
                    <div
                        className={getClassLink('release_date.desc')}
                        onClick={handleClick('release_date.desc')}
                    >
                        RELEASE DATE
                    </div>
                </ListGroup.Item>

                {/*<ListGroup.Item  style={{backgroundColor: '#778899', color: '#f2f2f2'}}>*/}
                {/*    <div*/}
                {/*        className={getClassLink('vote_average.desc')}*/}
                {/*        onClick={handleClick('vote_average.desc')}*/}
                {/*    >*/}
                {/*        VOTE AVERAGE DESC*/}
                {/*    </div>*/}
                {/*</ListGroup.Item>*/}

            </ListGroup>
        );

    }
}


export default MovieTabs;
