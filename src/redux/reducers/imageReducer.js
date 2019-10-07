import {
  SET_IMAGES,
  SET_IMAGE,
  LIKE_IMAGE,
  UNLIKE_IMAGE,
  COMMENT_TO_IMAGE
} from '../types';

const initialState = {
  images: [],
  image: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGES:
      return {
        ...state,
        images: action.payload,
        imageLoading: false
      };
    case SET_IMAGE:
      return {
        ...state,
        image: action.payload
      };
    case LIKE_IMAGE:
    case UNLIKE_IMAGE:
      let index = state.images.findIndex(
        image => image.imageId === action.payload.imageId
      );
      state.images[index] = action.payload;
      if (state.image.imageId === action.payload.imageId) {
        state.image = action.payload;
      }
      return {
        ...state
      };
    case COMMENT_TO_IMAGE:
      return {
        ...state,
        image: {
          ...state.image,
          commentCount: state.image.commentCount + 1,
          comments: [action.payload, ...state.image.comments]
        }
      };
    default:
      return state;
  }
}
