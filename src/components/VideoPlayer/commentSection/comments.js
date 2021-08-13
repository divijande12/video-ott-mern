/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { add_comment, get_comment } from '../../../actions/comments.action';



const commentStyle={
    backgroundColor: 'rgba(230, 219, 228,0.7)',
    color: '#FBEFF7',
    margin: '5px 0px 10px 10px',
    borderRadius: '4px',
    width: '98%',
}
const paperStyle={
    backgroundColor: 'rgba(230, 219, 228,0)',
    height: 'auto',
    marginBottom: '-15px',
    width: '100%'
}
const buttonStyle={
    marginLeft:'60px',
    display:'flex',
    letterSpacing: '2px',
    backgroundColor: '#5C164E',
    color: '#FBEFF7',
    fontFamily: 'sans-serif',
    marginBottom: '15px'
}
const contentStyle={
    margin: '20px 0px 10px 30px',
    borderRadius: '5px',
    color:'#FBEFF7',
    fontSize: '15px'
}
function Comments(props) {

    console.log('comment props - ',props)
    const user = props.user.user_info.id
    const video_id = props.video_id
    const [comment, setComment] = useState('')

    useEffect(()=>{
        props.get_comment({video_id:props.video_id})
    },[])
    const handleChange = (e)=>{
        e.preventDefault()
        const{
            name,value
        }= e.target

        if(name === 'comment'){
            setComment(value)
        }
    }
    const SubmitData = (e)=>{
        e.preventDefault();
        setComment('')
        props.add_comment({
            comment,
            user,
            video_id,
        })
    }


    return (
        <div>
            <Grid item xs={12}>
                <form onSubmit={SubmitData}>
                    <Paper style={paperStyle}>
                        <Grid item xs={8}>
                            <Typography style={{fontSize: '17px', margin:'15px', color: 'white',fontFamily: "sans-serif",}}>Add a Comment</Typography>
                            <div style={{display:'flex', margin:'10px'}}>
                            <Avatar style={{color:'grey', marginTop:'10px'}} src="/broken-image.jpg" />
                            <TextField
                                name='comment'
                                onChangeCapture={handleChange}
                                style={commentStyle}
                                id="outlined-multiline-flexible"
                                placeholder='Comment here...'
                                multiline
                                maxRows={5}
                                variant='outlined'
                                fullWidth
                            />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Button style={buttonStyle} onClick={SubmitData} variant="contained">Post</Button>
                        </Grid>
                        <Divider variant="middle" style={{background:'#9B287B'}} />
                        <Grid item xs={12}>
                            <Typography style={{fontSize: '17px', margin:'15px', color: '#FBEFF7',fontFamily: "sans-serif",}}>Comments</Typography>
                            {props.comment.comments.length > 0 && props.comment.comments.map((item,index)=>(
                                <div key={index}>
                                <Typography style={contentStyle}>
                                    {item.comment}
                                </Typography>
                                <Divider variant="middle" style={{background:'#9B287B'}} />
                            </div>
                            ))}
                        </Grid>
                        <Divider variant="middle" style={{background:'#9B287B'}} />
                    </Paper>
                </form>
            </Grid>            
        </div>
    )
}

const MapStatetoProps = (state) => ({ comment: state.comment, user: state.user, video: state.video })
export default connect(MapStatetoProps, { add_comment, get_comment })(Comments)