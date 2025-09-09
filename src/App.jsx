import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Home from "./components/Home"
import SignUp from "./components/SignUp";
import Premium from "./components/Premium";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/connects" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/premium" element={<Premium/>}/>          
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
