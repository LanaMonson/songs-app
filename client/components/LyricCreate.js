import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//CREATE LYRIC
class LyricCreate extends Component{
    constructor(props) {
        super(props);

        this.state = { content: '' };
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.state.content)
        console.log(this.props.songId)
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId //same songId as (line17) in SongDetail.js file (songId={this.props.params.id})
            }
        }).then(() => this.setState({ content: '' })).catch((err) => {console.log(err)});
    }

    render() {
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input 
                    value= {this.state.content}
                    onChange= {event => this.setState({content: event.target.value})}
                />
            </form>
        );
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;// shows error in GQL

export default graphql(mutation)(LyricCreate);