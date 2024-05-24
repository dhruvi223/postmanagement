import "./App.css";

// react imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// component imports
import Signup from "./views/authentication/Signup";
import Signin from "./views/authentication/Signin";
import Navbar from "./components/Navbar";
import Posts from "./views/posts/Posts";
import PostDetail from "./views/posts/PostDetail";
import Users from "./views/users/Users";
import UserDetail from "./views/users/UserDetail";
import Home from "./views/Home";


const isLoggedIn = JSON.parse(localStorage.getItem("isloggedIn"));

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/signup" element={
              !isLoggedIn ? <Signup /> : <Navigate to="/" replace={true} />
            } />
          <Route path="/signin" element={
              !isLoggedIn ? <Signin /> : <Navigate to="/" replace={true} />
            } />
          <Route
            path="/posts"
            element={
              isLoggedIn ? <Posts /> : <Navigate to="/signin" replace={true} />
            }
          />
          <Route
            path="/postdetail"
            element={
              isLoggedIn ? (
                <PostDetail />
              ) : (
                <Navigate to="/signin" replace={true} />
              )
            }
          />
          <Route
            path="/users"
            element={
              isLoggedIn ? <Users /> : <Navigate to="/signin" replace={true} />
            }
          />
          <Route
            path="/userdetail"
            element={
              isLoggedIn ? (
                <UserDetail />
              ) : (
                <Navigate to="/signin" replace={true} />
              )
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
