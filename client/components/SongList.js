import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

///DELETE
class SongList extends Component {
    onSongDelete(id) {
        this.props.mutate({ variables: { id } })
            .then(() => this.props.data.refetch());//same as refetch query
    }

    renderSongs() {
        return this.props.data.songs.map(({ id, title })=> {
            return(
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`}>
                    {title}
                    </Link>
                    <i 
                        className="material-icons" 
                        onClick={() => this.onSongDelete(id)}
                    >
                        delete
                    </i>
                </li>
            );
        });
    }

    render() {
        if (this.props.data.loading){ return <div>Loading...</div>; } //LOADING

        return( 
        <div>
            <ul className="collection">
                {this.renderSongs()}
            </ul>
            <Link
                to= "/songs/new"
                className="btn-floating btn-large gray right" // MY BUTTON
            >
                <i className="material-icons">add</i>
            </Link>
        </div>
        );  //Icon ADD 
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id){
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(query)(SongList)
);