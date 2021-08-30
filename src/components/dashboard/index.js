import React, { useEffect, useState } from "react";
import Appbar from "../appbar";
import { get_video } from "../../actions/videos.actions";
import { Image } from "cloudinary-react";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Grid, Paper, TextField } from "@material-ui/core";
import Loader from "../Skeleton/skeleton";
import SearchIcon from "@material-ui/icons/Search";

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
function Dashboard(props) {
  const [loading, setLoading] = useState(false);
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

  const videoArray = props.videos.videos;
  console.log(videoArray);
  const shuffleVideo = videoArray.sort(() => Math.random() - 0.5);
  console.log("shuffle", shuffleVideo);

  return (
    <React.Fragment>
      <div style={root}>
        <Appbar />
        <div
          style={{
            display: "flex",
            margin: "5px 15px 10px 50px",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <TextField
                id="standard-name"
                color="secondary"
                label="Search"
                InputLabelProps={{
                  style: {
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "100%",
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
                {props.videos.videos.length > 0 &&
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
                            }}>
                            {item.title}
                          </h6>
                        </div>
                      </Paper>
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
export default connect(MapStatetoProps, { get_video })(Dashboard);
