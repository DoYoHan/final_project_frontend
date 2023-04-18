import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Membership from "./membership";
import Detail from "./Detail";
import Mypage from "./mypage";
import MypageGuest from "./mypageGuest ";
import Admin from "./components/Admin/Admin";
import HelpUser from "./HelpUser";
import BoardDetail from "./components/Help/Board/BoardDetail";
import Bookmark from "./components/MyPage/Bookmark";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />}></Route>
          <Route path={"/membership"} element={<Membership />}></Route>
          <Route path={"/detail"} element={<Detail />}></Route>
          <Route path={"/mypage"} element={<Mypage />}></Route>
          <Route path={"/MypageGuest"} element={<MypageGuest />}></Route>
          <Route path={"/Admin"} element={<Admin />}></Route>
          <Route path={"/HelpUser"} element={<HelpUser />}></Route>
          <Route path={"/BoardDetail"} element={<BoardDetail />}></Route>
          <Route path={"/Bookmark"} element={<Bookmark />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
