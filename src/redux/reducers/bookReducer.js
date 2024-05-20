import { ActionTypes } from "../constants/action-types";
const initialState = {
    products: [],
 };
 export const fetchposts = (state = initialState, action) => {
     switch (action.type) {
       case ActionTypes.FETCHPOSTS:
         return {
           ...state,
           loading: true,
         };
       default:
         return state;
     }
   };

  export const fetchcomments = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.FETCHCOMMENTS:
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };
  export const fetchusers = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.FETCHUSERS:
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };

  export const fetchalbums = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.FETCHALBUMS:
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };

  export const fetchtodos = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.FETCHTODOS:
        return {
          ...state,
          loading: true,
        };
      default:
        return state;
    }
  };