import { combineReducers } from "redux";
import { fetchposts } from "./bookReducer";
import { fetchcomments } from "./bookReducer";
import { fetchusers } from "./bookReducer";
import { fetchalbums } from "./bookReducer";
import { fetchtodos } from "./bookReducer";

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