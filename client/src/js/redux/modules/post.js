import axios from "axios";
import { GET_POSTS_QUERY, GET_POST_QUERY } from '../../graphql/queries';
import {
  UPDATE_POST_QUERY,
  ADD_COMMENT_QUERY,
  ADD_POST_QUERY
} from '../../graphql/mutations';
//action types
export const SET_POSTS = "app/posts/load";
export const SET_SLIDER_POSTS = "app/slider-posts/load";
export const SET_POST = "app/post/load";
export const ADD_POST = "app/post/add";
export const ADD_POST_COMMENT = "app/post/comment/add";
export const UPDATE_POST = "app/post/update";
export const SET_ERROR = "app/post/error";
export const SET_POSTS_LIMIT = "app/posts/load/limit";

const initialState = {
  posts: [],
  errors: [],
  sliderPosts: [],
  post: {},
  loading: true,
  isLoadLimit: false,
};

//reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        loading: false,
        posts: [
          ...state.posts,
          action.payload
        ]
      }
    case SET_SLIDER_POSTS:
      return {
        ...state,
        loading: false,
        sliderPosts: action.payload
      }
    case SET_POSTS_LIMIT:
      return {
        ...state,
        loading: false,
        isLoadLimit: action.payload
      }
    case SET_POST:
    case UPDATE_POST:
    case ADD_POST:
      return {
        ...state,
        loading: false,
        post: {
          id: action.payload.id,
          title: action.payload.title,
          content: action.payload.content,
          image: action.payload.image,
          createdAt: action.payload.createdAt,
          comments: action.payload.comments
        }
      }
    case ADD_POST_COMMENT:
      return {
        ...state.errors,
        loading: false,
        post: {
          ...state.post,
          comments: [
            action.payload,
            ...state.post.comments
          ]
        }
      }
    case SET_ERROR:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state;
  }
}

//action creator
export function getPosts({ offset, limit }) {
  return async function(dispatch) {
    let response = await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: GET_POSTS_QUERY,
        variables: {
          offset: offset,
          limit: limit
        }
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    let { data, error } = response;
    if(error) {
      dispatch(setError(error));
    } else {
      let posts = data.data.posts;
      if(posts.length > 0)
        dispatch(setPosts(posts));
      else
        dispatch(setLoadLimit(true))
    }
  }
}

export function getSliderPosts({ offset, limit }) {
  return async function(dispatch) {
    let response = await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: GET_POSTS_QUERY,
        variables: {
          offset: offset,
          limit: limit
        }
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    let { data, error } = response;
    if(error) {
      dispatch(setError(error));
    } else {
      dispatch(setSliderPosts(data.data.posts));
    }
  }
}

export function getPost({ id }) {
  return async function(dispatch) {
    let response = await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: GET_POST_QUERY,
        variables: {
          id: id
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authKey') || ''
      }
    });

    let { data, error } = response;
    if(error) {
      dispatch(setError(error));
    } else {
      dispatch(setPost(data.data.post));
    }
  }
}

export function updatePost({ id, title, content, image }) {
  return async function(dispatch) {
    let response = await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: UPDATE_POST_QUERY,
        variables: {
          id: id,
          title: title,
          content: content,
          image: image
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authKey') || ''
      }
    });

    let { data, error } = response;
    if(error) {
      dispatch(setError(error));
    } else {
      dispatch(setPost(data.data.updatePost));
    }
  }
}

export function addPost({ title, content, image }) {
  return async function(dispatch) {
    let response = await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: ADD_POST_QUERY,
        variables: {
          title: title,
          content: content ? content : '',
          image: image ? image : ''
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authKey') || ''
      }
    });

    let { data, error } = response;
    if(error) {
      dispatch(setError(error));
    } else {
      dispatch(setPost(data.data.addPost));
    }
  }
}

export function addPostComment({ postId, content }) {
  return async function(dispatch) {
    let response = await axios({
      method: "POST",
      url: 'http://localhost:4000/graphql',
      data: {
        query: ADD_COMMENT_QUERY,
        variables: {
          postId: postId,
          content: content
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authKey') || ''
      }
    });

    let { data, error } = response;
    if(error) {
      dispatch(setError(error));
    } else {
      dispatch(setPostComment(data.data.addComment));
    }
  };
}

export function setPost(post) {
  return {
    type: SET_POST,
    payload: post
  };
}

export function setPostComment(comment) {
  return {
    type: ADD_POST_COMMENT,
    payload: comment
  };
}

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    payload: posts
  };
}

export function setSliderPosts(posts) {
  return {
    type: SET_SLIDER_POSTS,
    payload: posts
  };
}

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error
  };
}

export function setLoadLimit(isLoadLimit) {
  return {
    type: SET_POSTS_LIMIT,
    payload: isLoadLimit
  };
}
