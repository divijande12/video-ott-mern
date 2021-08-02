import axios from 'axios';
import { ADD_VIDEO, LOADING } from './types';

const add_video = (data) =>dispatch => {
    dispatch({type: LOADING})
    console.log('data - add_video() - ', data);
    axios.post('/api/videos/addVideo', data)
    .then(res=>{
        console.log('add_video() - res - ', res);
        if(res.data.success){
            dispatch({
                type: ADD_VIDEO,
                video: res.data.video,
                message: "",
            });

        }else{
            dispatch({
                type: ADD_VIDEO,
                video: null,
                message: res.data.message,
            });
        }
    })
    .catch(err=>{
        console.log('add_video() - err - ', err);
    });
}

export default add_video;