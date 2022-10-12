import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

import {
  closeCommentsModal,
  getViewCommentsModalOpen,
  addComment,
} from "store/slices/view";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBackgroundColor: {
    backgroundColor: theme.palette.primary.main,
  },
  secondaryBackgroundColor: {
    backgroundColor: theme.palette.secondary.light,
  },
  modalContent: {
    padding: "25px",
    backgroundColor: theme.palette.common.white,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  test: {
    height: "200px",
    width: "400px",
  },
  nameInput: {
    marginBottom: "20px",
  },
  bottomMargin: {
    marginBottom: "20px",
  },
}));

const CommentModal = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const isOpen = useSelector(getViewCommentsModalOpen);

  const handleClose = () => dispatch(closeCommentsModal());

  //submitting comment through redux
  const submitFunction = () => {
    let nameFromState = name;
    let commentFromState = comment;

    dispatch(
      addComment({
        name: nameFromState,
        comment: commentFromState,
      })
    );
    setName("");
    setComment("");
    handleClose();
  };

  const changeName = (value) => {
    setName(value);
  };

  const changeComment = (value) => {
    setComment(value);
  };

  //making sure input has first and last name and comment content
  const isButtonDisabled = () => {
    let nameIsCorrect = () => {
      if (name.split(" ").length < 2) {
        return false;
      } else {
        if (name.split(" ")[0].length < 1 || name.split(" ")[1].length < 1) {
          return false;
        } else {
          return true;
        }
      }
    };

    let commentIsCorrect = () => {
      if (comment.length < 1) {
        return false;
      } else {
        return true;
      }
    };

    if (nameIsCorrect() && commentIsCorrect()) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className={classes.modal}>
      <div className={`${classes.modalContent}`}>
        <h2>Add a Comment</h2>
        <Input
          className={classes.bottomMargin}
          onChange={(e) => {
            changeName(e.target.value);
          }}
          placeholder="first and last name"
          type={"text"}
        ></Input>
        <textarea
          onChange={(e) => {
            changeComment(e.target.value);
          }}
          placeholder="comment"
          type={"text"}
          className={`${classes.test} ${classes.bottomMargin}`}
        />
        <Button
          onClick={() => {
            submitFunction();
          }}
          color="primary"
          disabled={isButtonDisabled()}
        >
          submit
        </Button>
      </div>
    </Modal>
  );
};

export default CommentModal;
