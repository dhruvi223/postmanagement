import { combineReducers } from "redux";
import { fetchposts } from "./postReducer";
import { fetchcomments } from "./postReducer";
import { fetchusers } from "./postReducer";
import { fetchalbums } from "./postReducer";
import { fetchtodos } from "./postReducer";

const reducers = combineReducers({
    // fetchbook : fetchbook,
    // fetchonebook : fetchonebook
    fetchposts : fetchposts,
    fetchcomments : fetchcomments,
    fetchusers: fetchusers,
    fetchalbums : fetchalbums,
    fetchtodos : fetchtodos

})

export default reducers