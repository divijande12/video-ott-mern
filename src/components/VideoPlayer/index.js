import { Divider, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { get_video } from '../../actions/videos.actions'
import Appbar from '../appbar'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Comments from './commentSection/comments'

const root={
    backgroundImage: "linear-gradient(to top right, #291524, black)",
    backgroundSize: 'cover',
    height: '100%',
    boxSizing: 'border-box',
    display:'block',
}
const container={
    margin:'20px',
    
}
const player={
    
}
const titleStyle={
    color:'#FBEFF7',
    fontSize: '20px',
    margin: '23px',
    fontWeight: 'bold',
    fontFamily: "sans-serif",
}
const descriptionStyle={
    backgroundColor: 'rgba(230, 219, 228,0)',
    color:'#FBEFF7',
    margin: '3px',
    marginBottom: '5px',
    border:'none',
    display:'flex',
    flexDirection: 'column',
}
function VideoPlayer(props) {
    console.log('inside - ',props)

    const video_Id = props.location.state.videoId
    const title = props.location.state.title
    const description = props.location.state.description
    return (
        <div style={root}>
            <Appbar />
            <Grid item xs={12} style={container}>
                <Paper>
                    <ReactPlayer style={player} width='100%' height='70vh' playing={true} controls={true} url ={`https://www.youtube.com/watch?v=${video_Id}`} />
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Typography style={titleStyle}>
                    {title}
                </Typography>
            </Grid>
            <Divider variant="middle" style={{background:'#9B287B'}} />
            <Grid item xs={10}>
                <Accordion style={descriptionStyle}> 
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{color:'white', fontSize:'25px'}} />}
                        aria-label="Expand"
                        id="additional-actions1-header"
                        aria-controls="panel1a-content"
                    >
                        <Typography style={{fontSize: '17px',fontFamily: "sans-serif",}}>Description...</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography style={{fontSize: '13px',fontFamily: "sans-serif",}}>
                            {description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Divider variant="middle" style={{background:'#9B287B'}} />
            <Comments video_id={props.location.state.object}/>
        </div>
    )
}


const MapStatetoProps = (state) =>({
    videos: state.videos,
    user: state.user
})
export default connect(MapStatetoProps,{get_video})(VideoPlayer);