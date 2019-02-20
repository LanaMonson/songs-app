import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
    render() {
        const { song } = this.props.data;        

        if (!song) { return <div></div>; }

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{ song.title }</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={ this.props.params.id } />
            </div> //same songId as in LyricCreate.js file; child component.
        );
    }
}

//FETCH and also in QUERIES-> fetchSong, fetchSongs
export default graphql(fetchSong, {
    options: (props) => { return {variables: { id: props.params.id } } }//<-fetchSong query
})(SongDetail);//<- this pattern is reproducible to any project, you can use it to make a query
