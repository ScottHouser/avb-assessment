import { createSlice, createSelector } from "@reduxjs/toolkit";
import { mockComments } from "../api";

export const name = "view";
const initialState = {
  commentsModalOpen: false,
  comments: mockComments,
};

const viewSlice = createSlice({
  name,
  initialState,
  reducers: {
    openCommentsModal(state) {
      state.commentsModalOpen = true;
    },
    closeCommentsModal(state) {
      state.commentsModalOpen = false;
    },
    addComment(state, typeAndPayload) {
      let commentsFromState = state.comments;
      let comment = typeAndPayload.payload;
      comment.id = commentsFromState.length + 1;

      commentsFromState.push(comment);
      state.comments = [...commentsFromState];
    },
    loadCommentsFromServer(state, typeAndPayload) {
      let newComments = typeAndPayload.payload;
      state.comments = [...newComments];
    },
  },
});

const getSlice = (state) => state[name] || {};

export const getViewCommentsModalOpen = createSelector(
  getSlice,
  (slice) => slice.commentsModalOpen
);

export const getComments = createSelector(getSlice, (slice) => slice.comments);

export const {
  openCommentsModal,
  closeCommentsModal,
  addComment,
  loadCommentsFromServer,
} = viewSlice.actions;
export default viewSlice.reducer;
