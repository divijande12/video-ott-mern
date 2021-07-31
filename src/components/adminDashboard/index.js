import { AppBar, Button, Toolbar } from '@material-ui/core'
import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Untitled.png';
import add_video from '../../actions/videos.actions'
import { connect } from 'react-redux';



const root={
    backgroundImage: "linear-gradient(to top right, #291524, black)",
    backgroundSize: 'cover',
    height: '100%',
    boxSizing: 'border-box'
}
const paperStyle={
    height: 'auto',
    width: '85%',
    padding:'20px',
    margin: '10px auto',
    borderRadius: '15px',
    backgroundColor: 'rgba(230, 219, 228,0.9)',
}
const grid={
    padding: '50px'
}
const buttonStyle={
    margin: '15px',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
}
const headerStyle={
    color:'#5C164E',
    fontSize: "30px",
    fontStyle: "normal",
    fontWeight: "900",
    fontFamily: "sans-serif",
}
const appbarRoot={
    display: 'flex',
    flexGrow: 1,
}
const appbar={
    background: 'rgba(155, 40, 123, 0.3)',
}
const titleStyle={
    color: '#9B287B',
    margin: '5px',
    marginLeft: '-30px',
    marginTop: '9px',
    fontSize: '33px',
    letterSpacing: '4px',
    fontFamily: 'Style Script, cursive',
}
const container={
    display: 'flex',
    flexGrow: 1,
    margin: '5px',
}
const logoStyle={
    display:'flex',
    marginLeft: '-25px'
}
const appbarButton={
    display: 'inline-block',
}

// const Category = [
//     {value: 0, label: "Action & Adventure"},
//     {value: 1, label: "Comedy"},
//     {value: 2, label: "Music"},
//     {value: 3, label: "Sports"},
//     {value: 4, label: "Movies"},
//     {value: 5, label: "Science & Technology"},
//     {value: 6, label: "Programming"},
// ]

function AdminDashboard(props) {


    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('Action & Adventure');
    const [videoId,setVideoId] = useState('');
    const [thumbnail,setThumbnail] = useState('');

    const handleInputChange = (e) =>{
        e.preventDefault()
        const {
            name,value
        } = e.target

        if(name === 'title'){
            setTitle(value)
        }
        if(name === 'description'){
            setDescription(value)
        }
        if(name === 'category'){
            setCategory(value)
        }
        if(name === 'videoId'){
            setVideoId(value)
        }
        if(name === 'thumbnail'){
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = ()=>{
                setThumbnail(reader.result)
                console.log(reader.result)
            }

        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validate()){
            console.log('karan - videoId - ', videoId);
            props.add_video({
                title,
                description,
                category,
                thumbnail,
                videoId,
            });
        }
    }

    const validate=()=> {
        if(title === '') {
            return false;
        }
        
        return true;
    }


    return (
        <div style={root}>
            <div style={appbarRoot}>
                <AppBar style={appbar} position="static">
                    <Toolbar>
                        <div style={container}>
                            <div style={logoStyle}>
                                <img src={logo} width="115px" height="60px" alt=""/>
                            </div>
                            <h2 style={titleStyle}>PoP<span style={{color:'#D2B2CB'}}>FliX</span></h2>
                        </div>
                        <div style={appbarButton}>
                            <Button color="inherit"> 
                                <Link to="/dashboard" style={{color: '#9B287B', textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 'bold',fontSize:'14px'}}>
                                    Dashboard
                                </Link>
                            </Button>
                            <Button color="inherit"> 
                                <Link to='/logout' style={{color: '#9B287B', textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 'bold',fontSize:'14px'}}>
                                    Logout
                                </Link>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <Grid style={grid}>
                <Paper style={paperStyle} elevation={10}>
                    <Grid>
                        <Grid align="center">
                            <h2 style={headerStyle}>
                                Upload Video
                            </h2>
                        </Grid>
                        <form onSubmit={handleSubmit}> 
                            <div style={{margin:'15px'}}>
                                <TextField onChangeCapture={handleInputChange} name="title" id="outlined-basic" label="Title" placeholder="Enter Title" variant="outlined" fullWidth />
                            </div>
                            <div style={{margin:'15px'}}>
                                <TextField onChangeCapture={handleInputChange}
                                    name="description"
                                    id="outlined-multiline-static"
                                    label="Description"
                                    placeholder="Enter description"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>    
                            <div style={{margin:'15px'}}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                    <Select 
                                    name='Category'
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    label="Category"
                                    > 
                                    <MenuItem value="">
                                        
                                    </MenuItem>
                                    <MenuItem value={0}>Action & Adventure</MenuItem>
                                    <MenuItem value={1}>Comedy</MenuItem>
                                    <MenuItem value={2}>Music</MenuItem>
                                    <MenuItem value={3}>Sports</MenuItem>
                                    <MenuItem value={4}>Movies</MenuItem>
                                    <MenuItem value={5}>Science & Technology</MenuItem>
                                    <MenuItem value={6}>Programming</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{margin:'15px'}}>
                            <TextField onChangeCapture={handleInputChange}
                                name= "thumbnail"
                                id="outlined-basic"
                                label="Upload Thumbnail"
                                type="file"
                                placeholder="Placeholder"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            </div>
                            
                            <div style={{margin:'15px'}}>
                                <TextField onChangeCapture={handleInputChange} name="videoId" id="outlined-basic" label="VideoId" placeholder="Enter VideoId" variant="outlined" fullWidth/>
                            </div>
                            <div style={buttonStyle}> 
                                <Button style={{backgroundColor: '#5C164E', color: '#E7EBC5'}} variant="contained" type="submit" fullWidth startIcon={<PublishRoundedIcon />}>Upload</Button>
                            </div>
                        </form>
                    </Grid>
                </Paper>

            </Grid>
            
        </div>
    )
}
const MapStatetoProps = (state) =>({
    videos: state.videos
});
export default connect(MapStatetoProps, {add_video})(AdminDashboard)