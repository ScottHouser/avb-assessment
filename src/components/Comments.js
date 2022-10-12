import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  avatarContainer: {
    color: theme.palette.common.white,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    marginRight: "5px",
    fontSize: "20px",
    padding: "10px",
  },
  extraBottomMargin: {
    marginBottom: "15px",
  },
}));

function Comments(props) {
  const classes = useStyles();

  //mapping comments into ui components
  const returnComments = () => {
    if (props?.comments) {
      let commentsFromProps = [...props.comments];
      return commentsFromProps.reverse().map((comment) => {
        return (
          <Grid
            key={comment.id}
            className={classes.extraBottomMargin}
            container
            spacing={1}
          >
            <Grid className={classes.centered} item md={3}>
              <Paper
                className={`${classes.paper} ${classes.centered} ${classes.secondaryBackgroundColor}`}
              >
                <div className={classes.avatarContainer}>
                  {getAvatarIntials(comment.name)}
                </div>
                {comment.name}
              </Paper>
            </Grid>
            <Grid className={classes.centered} item md={9}>
              <Paper
                className={`${classes.paper} ${classes.centered} ${classes.primaryBackgroundColor}`}
              >
                {comment.comment || comment.body}
              </Paper>
            </Grid>
          </Grid>
        );
      });
    }
  };

  const getAvatarIntials = (name) => {
    let splitName = name.split(" ");

    return (
      splitName[0].substr(0, 1).toUpperCase() +
      splitName[1].substr(0, 1).toUpperCase()
    );
  };

  return <>{returnComments()}</>;
}

export default Comments;
