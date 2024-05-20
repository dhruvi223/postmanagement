import logo from './logo.svg';
import './App.css';
import Signup from './views/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './views/Signin';
import Navbar from './components/Navbar';
import Posts from './views/Posts';
import PostDetail from './views/PostDetail';
import Users from './views/Users';
import UserDetail from './views/UserDetail';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="App">
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/posts" element={<Posts/>}/>
      <Route path="/postdetail" element={<PostDetail/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/userdetail" element={<UserDetail/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
