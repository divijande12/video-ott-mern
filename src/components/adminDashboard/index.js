import React, { useEffect, useState } from "react";
import { get_video } from "../../actions/videos.actions";
import { Image } from "cloudinary-react";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@material-ui/core";
import Loader from "../Skeleton/skeleton";
import AdminAppbar from "../appbar/adminAppbar";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import { DOMAIN } from "../../constants";

const root = {
  backgroundImage: "linear-gradient(to top right, #291524, black)",
  backgroundSize: "cover",
  height: "auto",
  boxSizing: "border-box",
  display: "block",
};
const container = {
  display: "flex",
  flexWrap: "wrap",
};
const paperstyle = {
  margin: "5px",
  height: 250,
  backgroundColor: "rgba(230, 219, 228,0.1)",
  width: 285,
  alignItems: "center",
  textOverflow: "ellipsis",
  overflow: "hidden",
  cursor: "pointer",
  color: "#FBEFF7",
  fontFamily: "sans-serif",
};
const buttonStyle = {
  marginRight: "5px",
  textDecoration: "none",
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
  },
  laptop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1.7,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 330 },
    items: 1.1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobileSmall: {
    breakpoint: { max: 320, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
function AdminDashboard(props) {
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    props.get_video();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (videoId, title, description, id) => {
    props.history.push("/video/play", {
      videoId: videoId,
      title: title,
      description: description,
      object: id,
    });
  };

  console.log("videolist - ", props);
  console.log(props.user);

  const searchFunction = (e) => {
    e.preventDefault();
    const searchText = e.target.value;
    setSearch(searchText);
    setVideoData([
      ...props.videos.videos.filter((item) => {
        console.log("divij - inside - ", item.title);
        if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
          return true;
        }
        return false;
      }),
    ]);
  };

  const Delete = (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    console.log("divijdelete-", id);
    axios.delete(`${DOMAIN}/api/videos/${id}`);
    swal({
      title: "Are you sure?",
      text: `Are you sure that you want to delete?`,
      icon: "warning",
      dangerMode: true,
    }).then((Delete) => {
      if (Delete) {
        swal("Deleted!", "Your video has been deleted!", "success");
      }
    });
    setTimeout(() => {
      props.get_video();
    }, 2000);
  };

  const clearSearch = () => {
    setVideoData([]);
    setSearch("");
  };

  return (
    <React.Fragment>
      <div style={root}>
        <AdminAppbar />
        <div
          style={{
            display: "flex",
            margin: "5px 15px 10px 50px",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Grid container spacing={1} alignItems="flex-end">
            <IconButton type="submit" aria-label="search">
              {videoData.length === 0 ? (
                <SearchIcon style={{ color: "white", marginBottom: "-5px" }} />
              ) : (
                <CloseIcon
                  style={{ color: "white", marginBottom: "-5px" }}
                  onClick={clearSearch}
                />
              )}
            </IconButton>

            <Grid item xs={10} sm={6}>
              <TextField
                id="standard-name"
                color="secondary"
                label="Search"
                onChangeCapture={searchFunction}
                value={search}
                fullWidth
                InputLabelProps={{
                  style: {
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    color: "#9B287B",
                  },
                }}
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div style={container}>
          <Container fixed maxWidth="xl">
            <h3 style={{ color: "#FBEFF7" }}>All Videos</h3>
            {props.videos.videos.length !== null && loading === false ? (
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                ssr={true}>
                {videoData.length > 0
                  ? videoData.map((item, index) => (
                      <div key={index}>
                        <Paper
                          elevation={10}
                          style={paperstyle}
                          onClick={() =>
                            handleClick(
                              item.videoId,
                              item.title,
                              item.description,
                              item.id
                            )
                          }>
                          <div>
                            <Image
                              cloudName="domzykbc2"
                              public_id={item.thumbnail}
                              crop="scale"
                              height={180}
                              width={285}
                            />
                            <h6
                              style={{
                                fontSize: "13px",
                                marginTop: "4px",
                                textAlign: "center",
                                textOverflow: "ellipsis",
                              }}>
                              {item.title}
                            </h6>
                          </div>
                        </Paper>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "3px 0px 5px 5px",
                            justifyContent: "flex-start",
                          }}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/edit/${item.id}`}>
                            <Tooltip
                              title="Edit"
                              placement="bottom"
                              arrow
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 400 }}>
                              <IconButton
                                style={buttonStyle}
                                variant="outlined"
                                size="small"
                                color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip
                            title="Delete"
                            placement="right"
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}>
                            <IconButton
                              variant="outlined"
                              onClick={Delete}
                              id={item.id}
                              size="small"
                              color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    ))
                  : props.videos.videos.length > 0 &&
                    props.videos.videos.map((item, index) => (
                      <div key={index}>
                        <Paper
                          elevation={10}
                          style={paperstyle}
                          onClick={() =>
                            handleClick(
                              item.videoId,
                              item.title,
                              item.description,
                              item.id
                            )
                          }>
                          <div>
                            <Image
                              cloudName="domzykbc2"
                              public_id={item.thumbnail}
                              crop="scale"
                              height={180}
                              width={285}
                            />
                            <h6
                              style={{
                                fontSize: "13px",
                                marginTop: "4px",
                                textAlign: "center",
                                textOverflow: "ellipsis",
                              }}>
                              {item.title}
                            </h6>
                          </div>
                        </Paper>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "3px 0px 5px 5px",
                            justifyContent: "flex-start",
                          }}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/edit/${item.id}`}>
                            <Tooltip
                              title="Edit"
                              placement="bottom"
                              arrow
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 400 }}>
                              <IconButton
                                style={buttonStyle}
                                variant="outlined"
                                size="small"
                                color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip
                            title="Delete"
                            placement="right"
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}>
                            <IconButton
                              variant="outlined"
                              onClick={Delete}
                              id={item.id}
                              size="small"
                              color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
              </Carousel>
            ) : (
              <Loader />
            )}

            <h3 style={{ color: "#FBEFF7" }}>Action & Adventure</h3>
            {props.videos.videos.length !== null && loading === false ? (
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                ssr={true}>
                {props.videos.videos.length > 0 &&
                  props.videos.videos
                    .filter((item) => item.category === "Action & Adventure")
                    .map((item, index) => (
                      <div key={index}>
                        <Paper
                          elevation={10}
                          style={paperstyle}
                          onClick={() =>
                            handleClick(
                              item.videoId,
                              item.title,
                              item.description,
                              item.id
                            )
                          }>
                          <div>
                            <Image
                              cloudName="domzykbc2"
                              public_id={item.thumbnail}
                              crop="scale"
                              height={180}
                              width={285}
                            />
                            <h6
                              style={{
                                fontSize: "13px",
                                marginTop: "5px",
                                textAlign: "center",
                              }}>
                              {item.title}
                            </h6>
                          </div>
                        </Paper>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "3px 0px 5px 5px",
                            justifyContent: "flex-start",
                          }}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/edit/${item.id}`}>
                            <Tooltip
                              title="Edit"
                              placement="bottom"
                              arrow
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 400 }}>
                              <IconButton
                                style={buttonStyle}
                                variant="outlined"
                                size="small"
                                color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip
                            title="Delete"
                            placement="right"
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}>
                            <IconButton
                              variant="outlined"
                              onClick={Delete}
                              id={item.id}
                              size="small"
                              color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
              </Carousel>
            ) : (
              <Loader />
            )}

            <h3 style={{ color: "#FBEFF7" }}>Gaming</h3>
            {props.videos.videos.length !== null && loading === false ? (
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                ssr={true}>
                {props.videos.videos.length > 0 &&
                  props.videos.videos
                    .filter((item) => item.category === "Gaming")
                    .map((item, index) => (
                      <div key={index}>
                        <Paper
                          elevation={10}
                          style={paperstyle}
                          onClick={() =>
                            handleClick(
                              item.videoId,
                              item.title,
                              item.description,
                              item.id
                            )
                          }>
                          <div>
                            <Image
                              cloudName="domzykbc2"
                              public_id={item.thumbnail}
                              crop="scale"
                              height={180}
                              width={285}
                            />
                            <h6
                              style={{
                                fontSize: "13px",
                                marginTop: "5px",
                                textAlign: "center",
                              }}>
                              {item.title}
                            </h6>
                          </div>
                        </Paper>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "3px 0px 5px 5px",
                            justifyContent: "flex-start",
                          }}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/edit/${item.id}`}>
                            <Tooltip
                              title="Edit"
                              placement="bottom"
                              arrow
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 400 }}>
                              <IconButton
                                style={buttonStyle}
                                variant="outlined"
                                size="small"
                                color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip
                            title="Delete"
                            placement="right"
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}>
                            <IconButton
                              variant="outlined"
                              onClick={Delete}
                              id={item.id}
                              size="small"
                              color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
              </Carousel>
            ) : (
              <Loader />
            )}
            <h3 style={{ color: "#FBEFF7" }}>Sports</h3>
            {props.videos.videos.length !== null && loading === false ? (
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                ssr={true}>
                {props.videos.videos.length > 0 &&
                  props.videos.videos
                    .filter((item) => item.category === "Sports")
                    .map((item, index) => (
                      <div key={index}>
                        <Paper
                          elevation={10}
                          style={paperstyle}
                          onClick={() =>
                            handleClick(
                              item.videoId,
                              item.title,
                              item.description,
                              item.id
                            )
                          }>
                          <div>
                            <Image
                              cloudName="domzykbc2"
                              public_id={item.thumbnail}
                              crop="scale"
                              height={180}
                              width={285}
                            />
                            <h6
                              style={{
                                fontSize: "13px",
                                marginTop: "5px",
                                textAlign: "center",
                              }}>
                              {item.title}
                            </h6>
                          </div>
                        </Paper>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "3px 0px 5px 5px",
                            justifyContent: "flex-start",
                          }}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/edit/${item.id}`}>
                            <Tooltip
                              title="Edit"
                              placement="bottom"
                              arrow
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 400 }}>
                              <IconButton
                                style={buttonStyle}
                                variant="outlined"
                                size="small"
                                color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip
                            title="Delete"
                            placement="right"
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}>
                            <IconButton
                              variant="outlined"
                              onClick={Delete}
                              id={item.id}
                              size="small"
                              color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
              </Carousel>
            ) : (
              <Loader />
            )}

            <h3 style={{ color: "#FBEFF7" }}>Music</h3>
            {props.videos.videos.length !== null && loading === false ? (
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                ssr={true}>
                {props.videos.videos.length > 0 &&
                  props.videos.videos
                    .filter((item) => item.category === "Music")
                    .map((item, index) => (
                      <div key={index}>
                        <Paper
                          elevation={10}
                          style={paperstyle}
                          onClick={() =>
                            handleClick(
                              item.videoId,
                              item.title,
                              item.description,
                              item.id
                            )
                          }>
                          <div>
                            <Image
                              cloudName="domzykbc2"
                              public_id={item.thumbnail}
                              crop="scale"
                              height={180}
                              width={285}
                            />
                            <h6
                              style={{
                                fontSize: "13px",
                                marginTop: "5px",
                                textAlign: "center",
                              }}>
                              {item.title}
                            </h6>
                          </div>
                        </Paper>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "3px 0px 5px 5px",
                            justifyContent: "flex-start",
                          }}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/edit/${item.id}`}>
                            <Tooltip
                              title="Edit"
                              placement="bottom"
                              arrow
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 400 }}>
                              <IconButton
                                style={buttonStyle}
                                variant="outlined"
                                size="small"
                                color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip
                            title="Delete"
                            placement="right"
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}>
                            <IconButton
                              variant="outlined"
                              onClick={Delete}
                              id={item.id}
                              size="small"
                              color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
              </Carousel>
            ) : (
              <Loader />
            )}

            <h3 style={{ color: "#FBEFF7" }}>Comedy</h3>
            {props.videos.videos.length !== null && loading === false ? (
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                ssr={true}>
                {props.videos.videos.length > 0 &&
                  props.videos.videos
                    .filter((item) => item.category === "Comedy")
                    .map((item, index) => (
                      <div key={index}>
                        <Paper
                          elevation={10}
                          style={paperstyle}
                          onClick={() =>
                            handleClick(
                              item.videoId,
                              item.title,
                              item.description,
                              item.id
                            )
                          }>
                          <div>
                            <Image
                              cloudName="domzykbc2"
                              public_id={item.thumbnail}
                              crop="scale"
                              height={180}
                              width={285}
                            />
                            <h6
                              style={{
                                fontSize: "13px",
                                marginTop: "5px",
                                textAlign: "center",
                              }}>
                              {item.title}
                            </h6>
                          </div>
                        </Paper>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "3px 0px 5px 5px",
                            justifyContent: "flex-start",
                          }}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/edit/${item.id}`}>
                            <Tooltip
                              title="Edit"
                              placement="bottom"
                              arrow
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 400 }}>
                              <IconButton
                                style={buttonStyle}
                                variant="outlined"
                                size="small"
                                color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip
                            title="Delete"
                            placement="right"
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}>
                            <IconButton
                              variant="outlined"
                              onClick={Delete}
                              id={item.id}
                              size="small"
                              color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
              </Carousel>
            ) : (
              <Loader />
            )}

            <h3 style={{ color: "#FBEFF7" }}>Science & Technology</h3>
            {props.videos.videos.length !== null && loading === false ? (
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                ssr={true}>
                {props.videos.videos.length > 0 &&
                  props.videos.videos
                    .filter((item) => item.category === "Science & Technology")
                    .map((item, index) => (
                      <div key={index}>
                        <Paper
                          elevation={10}
                          style={paperstyle}
                          onClick={() =>
                            handleClick(
                              item.videoId,
                              item.title,
                              item.description,
                              item.id
                            )
                          }>
                          <div>
                            <Image
                              cloudName="domzykbc2"
                              public_id={item.thumbnail}
                              crop="scale"
                              height={180}
                              width={285}
                            />
                            <h6
                              style={{
                                fontSize: "13px",
                                marginTop: "5px",
                                textAlign: "center",
                              }}>
                              {item.title}
                            </h6>
                          </div>
                        </Paper>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "3px 0px 5px 5px",
                            justifyContent: "flex-start",
                          }}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/edit/${item.id}`}>
                            <Tooltip
                              title="Edit"
                              placement="bottom"
                              arrow
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 400 }}>
                              <IconButton
                                style={buttonStyle}
                                variant="outlined"
                                size="small"
                                color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip
                            title="Delete"
                            placement="right"
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}>
                            <IconButton
                              variant="outlined"
                              onClick={Delete}
                              id={item.id}
                              size="small"
                              color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
              </Carousel>
            ) : (
              <Loader />
            )}

            <h3 style={{ color: "#FBEFF7" }}>Programming</h3>
            {props.videos.videos.length !== null && loading === false ? (
              <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                ssr={true}>
                {props.videos.videos.length > 0 &&
                  props.videos.videos
                    .filter((item) => item.category === "Programming")
                    .map((item, index) => (
                      <div key={index}>
                        <Paper
                          elevation={10}
                          style={paperstyle}
                          onClick={() =>
                            handleClick(
                              item.videoId,
                              item.title,
                              item.description,
                              item.id
                            )
                          }>
                          <div>
                            <Image
                              cloudName="domzykbc2"
                              public_id={item.thumbnail}
                              crop="scale"
                              height={180}
                              width={285}
                            />
                            <h6
                              style={{
                                fontSize: "13px",
                                marginTop: "5px",
                                textAlign: "center",
                              }}>
                              {item.title}
                            </h6>
                          </div>
                        </Paper>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "3px 0px 5px 5px",
                            justifyContent: "flex-start",
                          }}>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/edit/${item.id}`}>
                            <Tooltip
                              title="Edit"
                              placement="bottom"
                              arrow
                              TransitionComponent={Fade}
                              TransitionProps={{ timeout: 400 }}>
                              <IconButton
                                style={buttonStyle}
                                variant="outlined"
                                size="small"
                                color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip
                            title="Delete"
                            placement="right"
                            arrow
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 400 }}>
                            <IconButton
                              variant="outlined"
                              onClick={Delete}
                              id={item.id}
                              size="small"
                              color="secondary">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
              </Carousel>
            ) : (
              <Loader />
            )}
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
}

const MapStatetoProps = (state) => ({
  videos: state.videos,
  user: state.user,
});
export default connect(MapStatetoProps, { get_video })(AdminDashboard);
