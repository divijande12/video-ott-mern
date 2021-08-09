import React from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { get_video } from '../../actions/videos.actions'
import Appbar from '../appbar'


const root={
    backgroundImage: "linear-gradient(to top right, #291524, black)",
    backgroundSize: 'cover',
    height: 'auto',
    boxSizing: 'border-box',
    display:'block',
}
const container={
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    paddingTop: '56.25%',
}
const player={
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexWrap: 'wrap',
}
function VideoPlayer(props) {
    console.log('inside - ',props)

    const video_Id = props.location.state.videoId
    return (
        <div style={root}>
            <Appbar />
            <div style={container}>
                <ReactPlayer style={player} width='100%' height='70vh' playing={true} url ={`https://www.youtube.com/watch?v=${video_Id}`} />
            </div>
        </div>
    )
}


const MapStatetoProps = (state) =>({
    videos: state.videos
})
export default connect(MapStatetoProps,{get_video})(VideoPlayer);