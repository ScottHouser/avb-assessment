import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "app/App.css";
import Header from "components/Header";
import CommentModal from "components/CommentModal";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Comments from "components/Comments";
import CommentorCount from "components/CommentorCount";

import { getComments, loadCommentsFromServer } from "store/slices/view";

import { getCommentsFromServer } from "store/getCommentsApi";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  white: {
    color: theme.palette.common.white,
  },
  marginTest: {
    margin: "5px",
  },
  extraPadding: {
    padding: "5px",
  },
  grey: {
    paddingTop: "100px",
    backgroundColor: theme.palette.grey[800],
  },
  extraBottomMargin: {
    marginBottom: "15px",
  },
}));

function App() {
  const [topCommentors, setTopCommentors] = useState([]);
  const comments = useSelector(getComments);
  const dispatch = useDispatch();
  const classes = useStyles();

  //calling api for comments when component mounts
  useEffect(() => {
    let mounted = true;
    getCommentsFromServer()
      .then((items) => {
        if (mounted) {
          dispatch(loadCommentsFromServer(items));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => (mounted = false);
  }, []);

  //the code below agregates the top 3 commentors by name. There was some inconsistancy between the dummy data and the api data
  //I chose name as the key by which to sort since the dummy data did not have emails or Ids. I wanted it to work for both.
  //the api has only unique names, so you will have to write comments to see this work
  //only running this sort when comments changes
  useEffect(() => {
    const commentMap = {};
    const sortedCommentMap = [];

    if (comments) {
      //create a map of user names and number of comments
      comments.forEach((comment) => {
        if (!commentMap.hasOwnProperty(comment.name)) {
          commentMap[comment.name] = 1;
        } else {
          let prevValue = commentMap[comment.name];
          commentMap[comment.name] = prevValue + 1;
        }
      });

      //turn the map into an array
      for (const [key, value] of Object.entries(commentMap)) {
        sortedCommentMap.push({ [key]: value });
      }

      //sort the array from high to low and grab the first 3
      let sortedCommentsFinal = sortedCommentMap.sort((a, b) =>
        Object.values(a)[0] < Object.values(b)[0]
          ? 1
          : Object.values(b)[0] < Object.values(a)[0]
          ? -1
          : 0
      );
      setTopCommentors(sortedCommentsFinal.slice(0, 3));
    }
  }, [comments]);

  return (
    <>
      <Header />
      <CommentModal />
      <Container className={classes.grey}>
        <div className={classes.root}>
          <h1 className={classes.white}>Top commentors</h1>
          <Grid container spacing={1}>
            <CommentorCount topCommentors={topCommentors} />
          </Grid>
          <h1 className={classes.white}>Comments</h1>
          <Comments comments={comments} />
        </div>
      </Container>
    </>
  );
}

export default App;
