import axios from 'axios';
import { ADD_VIDEO, LOADING } from './types';

const add_video = (data) =>dispatch => {
    console.log('karan - data - add_video() - ', data);
    axios.post('/api/videos/addVideo', data)
    .then(res=>{
        console.log('karan - add_video() - res - ', res);
    })
    .catch(err=>{
        console.log('karan - add_video() - err - ', err);
    });
}

const add_video_backup = (data) => (dispatch, getState) =>{
    dispatch({type: LOADING});
    axios
        .post("/api/videos/addvideos",data, {
            headers: {"auth-token": getState().auth.token},
        })
        .then((res)=>{
            console.log(res.data)
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
        .catch((err)=>{
            console.log(err)
        })
}
export default add_video;