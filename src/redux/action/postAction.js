import { ActionTypes } from "../constants/action-types";
import axios from "axios";

export const fetchposts = (setPosts) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCHPOSTS });
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((data) => setPosts(data.data))
      .catch((error) => console.log(error));
  };
};


export const fetchcomments = (setComments, id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FETCHCOMMENTS });
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((data) => setComments(data.data))
      .catch((error) => console.log(error));
  };
};




export const fetchusers = (setUsers) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.FETCHUSERS });
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((data) => setUsers(data.data))
        .catch((error) => console.log(error));
    };
  };

  export const fetchalbums = (setAlbums, id) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.FETCHALBUMS });
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
        .then((data) => setAlbums(data.data))
        .catch((error) => console.log(error));
    };
  };
  
  export const fetchtodos = (setTodos, id) => {
    return async (dispatch) => {
      dispatch({ type: ActionTypes.FETCHTODOS});
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
        .then((data) => setTodos(data.data))
        .catch((error) => console.log(error));
    };
  };