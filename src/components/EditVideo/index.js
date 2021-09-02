/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppBar,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import UpdateIcon from "@material-ui/icons/Update";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Untitled.png";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import axios from "axios";

const root = {
  backgroundImage: "linear-gradient(to top right, #291524, black)",
  backgroundSize: "cover",
  height: "100%",
  boxSizing: "border-box",
};
const paperStyle = {
  height: "auto",
  width: "85%",
  padding: "20px",
  margin: "10px auto",
  borderRadius: "15px",
  backgroundColor: "rgba(230, 219, 228,0.9)",
};
const grid = {
  padding: "50px",
};
const buttonStyle = {
  margin: "15px",
  display: "flex",
  flexWrap: "wrap",
  flexGrow: 1,
};
const headerStyle = {
  color: "#5C164E",
  fontSize: "30px",
  fontStyle: "normal",
  fontWeight: "900",
  fontFamily: "sans-serif",
};
const appbarRoot = {
  display: "flex",
  flexGrow: 1,
};
const appbar = {
  background: "rgba(155, 40, 123, 0.3)",
  zIndex: 0,
};
const titleStyle = {
  color: "#9B287B",
  margin: "5px",
  marginLeft: "-30px",
  marginTop: "9px",
  fontSize: "33px",
  letterSpacing: "3px",
  fontFamily: "Style Script, cursive",
};
const container = {
  display: "flex",
  flexGrow: 1,
  margin: "5px",
};
const logoStyle = {
  display: "flex",
  marginLeft: "-25px",
};
const appbarButton = {
  display: "inline-block",
};

const Categories = [
  "Action & Adventure",
  "Comedy",
  "Music",
  "Sports",
  "Gaming",
  "Science & Technology",
  "Programming",
];

export default function EditVideo(props) {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/videos/get/${props.match.params.id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCategory(res.data.category);
        setVideoId(res.data.videoId);
      })
      .catch((err) => {
        console.log("divij - err -", err);
      });
  }, []);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };
  const handleVideoIdChange = (e) => {
    const value = e.target.value;
    setVideoId(value);
  };
  const submitData = (e) => {
    const editVideo = () => {
      axios
        .put(`http://localhost:5000/api/videos/${props.match.params.id}`, {
          title,
          description,
          category,
          videoId,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    editVideo();
    setTimeout(() => {
      addToast("Video Edited Successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
      history.push("/admin-dashboard");
    }, 1000);
  };
  console.log("edit - ", props);
  const {
    // register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

  return (
    <div style={root}>
      <div style={appbarRoot}>
        <AppBar style={appbar} position="static">
          <Toolbar>
            <div style={container}>
              <div style={logoStyle}>
                <img src={logo} width="115px" height="60px" alt="" />
              </div>
              <h2 style={titleStyle}>
                PoP<span style={{ color: "#D2B2CB" }}>FliX</span>
              </h2>
            </div>
            <div style={appbarButton}>
              <Button color="inherit">
                <Link
                  to="/admin-dashboard"
                  style={{
                    color: "#9B287B",
                    textDecoration: "none",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}>
                  Dashboard
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/logout"
                  style={{
                    color: "#9B287B",
                    textDecoration: "none",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}>
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
              <h2 style={headerStyle}>Edit Video</h2>
            </Grid>
            <form onSubmit={handleSubmit(submitData)}>
              <div style={{ margin: "15px" }}>
                <TextField
                  name="title"
                  id="outlined-basic"
                  onChange={handleTitleChange}
                  value={title}
                  label="Title"
                  placeholder="Enter Title"
                  variant="outlined"
                  required
                  //   {...register("title", { required: "Title is required" })}
                  //   error={Boolean(errors.title)}
                  //   helperText={errors.title?.message}
                  fullWidth
                />
              </div>
              <div style={{ margin: "15px" }}>
                <TextField
                  name="description"
                  id="outlined-multiline-static"
                  onChangeCapture={handleDescriptionChange}
                  value={description}
                  label="Description"
                  placeholder="Enter description"
                  multiline
                  rows={5}
                  variant="outlined"
                  required
                  //   {...register("description", {
                  //     required: "Description is required",
                  //   })}
                  //   error={Boolean(errors.description)}
                  //   helperText={errors.description?.message}
                  fullWidth
                />
              </div>
              <div style={{ margin: "15px" }}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.category)}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Category
                  </InputLabel>
                  <Select
                    name="category"
                    onChange={handleCategoryChange}
                    value={category}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Category"
                    displayEmpty
                    control={control}
                    // rules={{...register("category",{required:"Category is required"})}}
                  >
                    {Categories.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormHelperText
                  style={{ color: "#f44336", marginLeft: "12px" }}>
                  {errors.category?.message}
                </FormHelperText>
              </div>
              {/* <div style={{ margin: "15px" }}>
                <TextField
                  name="thumbnail"
                  onChange={handleInputChange}
                  //   value={editVideo.thumbnail}
                  id="outlined-basic"
                  label="Upload Thumbnail"
                  type="file"
                  placeholder="Placeholder"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("thumbnail", {
                    required: "Thumbnail is required",
                  })}
                  error={Boolean(errors.thumbnail)}
                  helperText={errors.thumbnail?.message}
                  variant="outlined"
                />
              </div> */}

              <div style={{ margin: "15px" }}>
                <TextField
                  name="videoId"
                  onChangeCapture={handleVideoIdChange}
                  value={videoId}
                  id="outlined-basic"
                  label="VideoId"
                  placeholder="Enter VideoId"
                  variant="outlined"
                  fullWidth
                  required
                  //   {...register("videoId", { required: "VideoId is required" })}
                  //   error={Boolean(errors.videoId)}
                  //   helperText={errors.videoId?.message}
                />
              </div>
              <div style={buttonStyle}>
                <Button
                  style={{ backgroundColor: "#5C164E", color: "#E7EBC5" }}
                  variant="contained"
                  type="submit"
                  fullWidth
                  startIcon={<UpdateIcon />}>
                  Update
                </Button>
              </div>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}
