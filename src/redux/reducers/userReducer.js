import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SUBMIT_COMMENT,
  MARK_NOTIFICATIONS_READ,
  LIKE_IMAGE,
  UNLIKE_IMAGE,
  COMMENT_TO_IMAGE
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  comments: [],
  notifications: [],
  imageLikes: [],
  imageComments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.screamId !== action.payload.screamId
        )
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
            body: action.payload.body,
            userImage: action.payload.userImage,
            createdAt: action.payload.createdAt
          }
        ]
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(not => (not.read = true));
      return {
        ...state
      };
    case LIKE_IMAGE:
      return {
        ...state,
        imageLikes: [
          ...state.imageLikes,
          {
            userHandle: state.credentials.handle,
            imageId: action.payload.imageId
          }
        ]
      };
    case UNLIKE_IMAGE:
      return {
        ...state,
        imageLikes: state.imageLikes.filter(
          like => like.imageId !== action.payload.imageId
        )
      };
    case COMMENT_TO_IMAGE:
      return {
        ...state,
        imageComments: [
          ...state.imageComments,
          {
            userHandle: state.credentials.handle,
            imageId: action.payload.imageId,
            body: action.payload.body,
            userImage: action.payload.userImage,
            createdAt: action.payload.createdAt
          }
        ]
      };
    default:
      return state;
  }
}
