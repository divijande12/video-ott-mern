import React, { useEffect } from 'react'
import Appbar from '../appbar'
import { get_video } from '../../actions/videos.actions';
import { Image } from 'cloudinary-react';
import { connect } from 'react-redux';


const root={
    backgroundImage: "linear-gradient(to top right, #291524, black)",
    backgroundSize: 'cover',
    height: '102vh',
    boxSizing: 'border-box'
}

function Dashboard (props) {

    
    useEffect(()=>{
        console.log("useEffect");
        props.get_video();
    },[]);
    console.log('videolist - ',props.videos)
    return (
        <div style={root}>
            <Appbar />
            {props.videos.videos.length > 0 && props.videos.videos.map((item)=>(
                <div>
                    <Image
                        cloudName = "domzykbc2"
                        publicId ={item.thumbnail}
                        crop = "scale"
                        height ={138}
                        width ={246}
                    />
                    <span><h3>{item.title}</h3></span>
                </div>
            ))}
        </div>
    )
}

const MapStatetoProps = (state) =>({
    videos: state.videos
})
export default connect(MapStatetoProps,{get_video})(Dashboard);