/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, IconButton, Typography } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { connect } from "react-redux";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { DOMAIN } from "../../../constants";

function LikeDislikes(props) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);

  console.log("likes - ", props);
  const user = props.user.user_info.id;
  const video_id = props.video_id;
  useEffect(() => {
    console.log("useEffect - ", props);
    axios
      .post(`${DOMAIN}/api/like/getLikes`, { video_id, user })
      .then((res) => {
        console.log("res getlikes - ", res);

        if (res.data.success) {
          setLikes(res.data.message.length);

          res.data.message.map((message) => {
            console.log(props.user);
            if (message.user === props.user.user_info.id) {
              setLikeAction("liked");
            }
          });
        } else {
          console.log("failed to get likes");
        }
      });
    axios
      .post(`${DOMAIN}/api/like/getDisLikes`, { video_id, user })
      .then((res) => {
        console.log("res getdislikes - ", res);

        if (res.data.success) {
          setDislikes(res.data.message.length);

          res.data.message.map((message) => {
            if (message.user === props.user.user_info.id) {
              setLikeAction("disliked");
            }
          });
        } else {
          console.log("failed to get likes");
        }
      });
  }, []);

  const onLike = () => {
    if (likeAction === null) {
      axios
        .post(`${DOMAIN}/api/like/uplike`, { video_id, user })
        .then((res) => {
          if (res.data.success) {
            setLikes(likes + 1);
            setLikeAction("liked");

            if (dislikeAction !== null) {
              setDislikes(dislikes - 1);
              setDislikeAction(null);
            }
          } else {
            console.log("failed to increase the like");
          }
        });
    } else {
      axios
        .post(`${DOMAIN}/api/like/unlike`, { video_id, user })
        .then((res) => {
          if (res.data.success) {
            setLikes(likes - 1);
            setLikeAction(null);
          } else {
            console.log("failed to decrease the like");
          }
        });
    }
  };

  const onDislike = () => {
    if (dislikeAction !== null) {
      axios
        .post(`${DOMAIN}/api/like/undislike`, { video_id, user })
        .then((res) => {
          if (res.data.success) {
            setDislikes(dislikes - 1);
            setDislikeAction(null);
          } else {
            console.log("failed to decrease the like");
          }
        });
    } else {
      axios
        .post(`${DOMAIN}/api/like/updislike`, { video_id, user })
        .then((res) => {
          if (res.data.success) {
            setDislikes(dislikes + 1);
            setDislikeAction("disliked");

            if (likeAction !== null) {
              setLikeAction(null);
              setLikes(likes - 1);
            }
          } else {
            console.log("failed to increase dislike");
          }
        });
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Grid style={{ marginTop: "-10px", marginRight: "20px" }}>
        <IconButton onClick={onLike}>
          {likeAction ? (
            <ThumbUpAltIcon style={{ color: "white", fontsize: "30px" }} />
          ) : (
            <ThumbUpAltOutlinedIcon
              style={{ color: "white", fontsize: "30px" }}
            />
          )}

          <Typography style={{ color: "#c3329a", marginLeft: "7px" }}>
            {likes}
          </Typography>
        </IconButton>
      </Grid>
      <Grid style={{ marginTop: "-10px", marginRight: "20px" }}>
        <IconButton onClick={onDislike}>
          {dislikeAction ? (
            <ThumbDownIcon
              style={{ color: "white", marginLeft: "-20px", fontsize: "30px" }}
            />
          ) : (
            <ThumbDownAltOutlinedIcon
              style={{ color: "white", marginLeft: "-20px", fontsize: "30px" }}
            />
          )}

          <Typography style={{ color: "#c3329a", marginLeft: "7px" }}>
            {dislikes}
          </Typography>
        </IconButton>
      </Grid>
    </div>
  );
}

const MapStateToProps = (state) => ({
  like: state.like,
  user: state.user,
  video: state.video,
});
export default connect(MapStateToProps, {})(LikeDislikes);
