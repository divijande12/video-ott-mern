import React, { useEffect } from 'react';
import Appbar from '../appbar';
import { get_video } from '../../actions/videos.actions';
import { Image } from 'cloudinary-react';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Container, Paper } from '@material-ui/core';



const root={
    backgroundImage: "linear-gradient(to top right, #291524, black)",
    backgroundSize: 'cover',
    height: 'auto',
    boxSizing: 'border-box',
    display:'block',
}
const container ={
    display:'flex',
    flexWrap: 'wrap',
    
}
const paperstyle={
    margin:'5px',
    height: 250,
    backgroundColor: 'rgba(230, 219, 228,0.1)',
    width: 285,
    alignItems: 'center',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    cursor: 'pointer',
    color: "white",
    fontFamily: "sans-serif"
}


const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
};
function Dashboard (props) {

    // const history = useHistory()
    
    useEffect(()=>{
        props.get_video();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleClick = (videoId) => {
        props.history.push("/video/play",{videoId: videoId})
    }

    console.log('videolist - ',props)

    return (
        <React.Fragment>
            <div style={root}>
                <Appbar />
                <div style={container}>
                    <Container fixed maxWidth='xl'>
                        <h3 style={{color:'white'}}>All Videos</h3>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            draggable={true}
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            ssr={true}
                        >
                        {props.videos.videos.length > 0 && props.videos.videos.map((item, index)=>(
                            <div key={index}>
                                <Paper elevation={10} style={paperstyle} onClick={()=>handleClick(item.videoId)}>
                                    <div>
                                        <Image 
                                            cloudName="domzykbc2"
                                            public_id={item.thumbnail}
                                            crop='scale'
                                            height={180}
                                            width={285}
                                        />
                                        <h6 style={{fontSize:'13px',marginTop:'4px',textAlign:'center'}}>{item.title}</h6>
                                    </div>
                                </Paper>
                            </div>
                        ))}
                        </Carousel>
                        <h3 style={{color:'white'}}>Action & Adventure</h3>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            draggable={true}
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            ssr={true}
                        >
                        {props.videos.videos.length > 0 && props.videos.videos.filter(item=>item.category === 'Action & Adventure')
                        .map((item, index)=>(
                            <div key={index}>
                                <Paper elevation={10} style={paperstyle} onClick={()=>handleClick(item.videoId)}>
                                    <div>
                                        <Image 
                                            cloudName="domzykbc2"
                                            public_id={item.thumbnail}
                                            crop='scale'
                                            height={180}
                                            width={285}
                                        />
                                        <h6 style={{fontSize:'13px',marginTop:'5px',textAlign:'center'}}>{item.title}</h6>
                                    </div>
                                </Paper>
                            </div>
                        ))}
                        </Carousel>
                        <h3 style={{color:'white'}}>Movies</h3>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            draggable={true}
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            ssr={true}
                        >
                        {props.videos.videos.length > 0 && props.videos.videos.filter(item=>item.category === 'Movies')
                        .map((item, index)=>(
                            <div key={index}>
                                <Paper elevation={10} style={paperstyle} onClick={()=>handleClick(item.videoId)}>
                                    <div>
                                        <Image 
                                            cloudName="domzykbc2"
                                            public_id={item.thumbnail}
                                            crop='scale'
                                            height={180}
                                            width={285}
                                        />
                                        <h6 style={{fontSize:'13px',marginTop:'5px',textAlign:'center'}}>{item.title}</h6>
                                    </div>
                                </Paper>
                            </div>
                        ))}
                        </Carousel>
                        <h3 style={{color:'white'}}>Sports</h3>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            draggable={true}
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            ssr={true}
                        >
                        {props.videos.videos.length > 0 && props.videos.videos.filter(item=>item.category === 'Sports')
                        .map((item, index)=>(
                            <div key={index}>
                                <Paper elevation={10} style={paperstyle} onClick={()=>handleClick(item.videoId)}>
                                    <div>
                                        <Image 
                                            cloudName="domzykbc2"
                                            public_id={item.thumbnail}
                                            crop='scale'
                                            height={180}
                                            width={285}
                                        />
                                        <h6 style={{fontSize:'13px',marginTop:'5px',textAlign:'center'}}>{item.title}</h6>
                                    </div>
                                </Paper>
                            </div>
                        ))}
                        </Carousel>
                        <h3 style={{color:'white'}}>Music</h3>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            draggable={true}
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            ssr={true}
                        >
                        {props.videos.videos.length > 0 && props.videos.videos.filter(item=>item.category === 'Music')
                        .map((item, index)=>(
                            <div key={index}>
                                <Paper elevation={10} style={paperstyle} onClick={()=>handleClick(item.videoId)}>
                                    <div>
                                        <Image 
                                            cloudName="domzykbc2"
                                            public_id={item.thumbnail}
                                            crop='scale'
                                            height={180}
                                            width={285}
                                        />
                                        <h6 style={{fontSize:'13px',marginTop:'5px',textAlign:'center'}}>{item.title}</h6>
                                    </div>
                                </Paper>
                            </div>
                        ))}
                        </Carousel>
                        <h3 style={{color:'white'}}>Comedy</h3>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            draggable={true}
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            ssr={true}
                        >
                        {props.videos.videos.length > 0 && props.videos.videos.filter(item=>item.category === 'Comedy')
                        .map((item, index)=>(
                            <div key={index}>
                                <Paper elevation={10} style={paperstyle} onClick={()=>handleClick(item.videoId)}>
                                    <div>
                                        <Image 
                                            cloudName="domzykbc2"
                                            public_id={item.thumbnail}
                                            crop='scale'
                                            height={180}
                                            width={285}
                                        />
                                        <h6 style={{fontSize:'13px',marginTop:'5px',textAlign:'center'}}>{item.title}</h6>
                                    </div>
                                </Paper>
                            </div>
                        ))}
                        </Carousel>
                        <h3 style={{color:'white'}}>Science & Technology</h3>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            draggable={true}
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            ssr={true}
                        >
                        {props.videos.videos.length > 0 && props.videos.videos.filter(item=>item.category === 'Science & Technology')
                        .map((item, index)=>(
                            <div key={index}>
                                <Paper elevation={10} style={paperstyle} onClick={()=>handleClick(item.videoId)}>
                                    <div>
                                        <Image 
                                            cloudName="domzykbc2"
                                            public_id={item.thumbnail}
                                            crop='scale'
                                            height={180}
                                            width={285}
                                        />
                                        <h6 style={{fontSize:'13px',marginTop:'5px',textAlign:'center'}}>{item.title}</h6>
                                    </div>
                                </Paper>
                            </div>
                        ))}
                        </Carousel>
                        <h3 style={{color:'white'}}>Programming</h3>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            draggable={true}
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            ssr={true}
                        >
                        {props.videos.videos.length > 0 && props.videos.videos.filter(item=>item.category === 'Programming')
                        .map((item, index)=>(
                            <div key={index}>
                                <Paper elevation={10} style={paperstyle} onClick={()=>handleClick(item.videoId)}>
                                    <div>
                                        <Image 
                                            cloudName="domzykbc2"
                                            public_id={item.thumbnail}
                                            crop='scale'
                                            height={180}
                                            width={285}
                                        />
                                        <h6 style={{fontSize:'13px',marginTop:'5px',textAlign:'center'}}>{item.title}</h6>
                                    </div>
                                </Paper>
                            </div>
                        ))}
                        </Carousel>
                    </Container>
                </div>
            </div>

        </React.Fragment>
    )
}

const MapStatetoProps = (state) =>({
    videos: state.videos
})
export default connect(MapStatetoProps,{get_video})(Dashboard);