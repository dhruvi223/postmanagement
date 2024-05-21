import "./App.css";

// react imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/postdetail" element={<PostDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/userdetail" element={<UserDetail />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
