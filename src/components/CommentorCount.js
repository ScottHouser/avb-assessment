import React from "react";
import "app/App.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  centered: {
    display: "flex",
    alignItems: "center",
  },
  paper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    width: "100%",
  },
  primaryBackgroundColor: {
    backgroundColor: theme.palette.primary.main,
  },
  secondaryBackgroundColor: {
    backgroundColor: theme.palette.secondary.light,
  },
  marginSmall: {
    margin: "5px",
  },
  extraPadding: {
    padding: "5px",
  },
  extraBottomMargin: {
    marginBottom: "15px",
  },
}));

function CommentorCount(props) {
  const classes = useStyles();

  const returnTopCommentors = () => {
    return props.topCommentors.map((commentor) => {
      return (
        <Grid
          key={Object.keys(commentor)[0]}
          className={`${classes.extraBottomMargin} ${classes.centered}`}
          item
          md={4}
        >
          <Paper
            className={`${classes.paper} ${classes.centered} ${classes.primaryBackgroundColor}`}
          >
            <Grid className={classes.centered} item md={2}>
              <Paper
                className={`${classes.paper} ${classes.centered} ${classes.marginSmall} ${classes.secondaryBackgroundColor}`}
              >
                {getAvatarIntials(Object.keys(commentor)[0])}
              </Paper>
            </Grid>
            <Grid className={classes.extraPadding} item md={6}>
              {Object.keys(commentor)[0]}
            </Grid>
            <Grid className={classes.extraPadding} item md={4}>
              {`count: ${Object.values(commentor)[0]}`}
            </Grid>
          </Paper>
        </Grid>
      );
    });
  };

  const getAvatarIntials = (name) => {
    let splitName = name.split(" ");

    return (
      splitName[0].substr(0, 1).toUpperCase() +
      splitName[1].substr(0, 1).toUpperCase()
    );
  };

  return <>{returnTopCommentors()}</>;
}

export default CommentorCount;
