import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import AppList from "./pages/appList.jsx/AppList";
import { useContext, useEffect } from "react";
import Report from "./pages/Report/Report";
import { DarkModeContext } from "./context/darkModeContext";
import { UserContext } from "./context/UserContext";
function App() {
  const navigate= useNavigate()
  const {userDetails} = useContext(UserContext)
  const user= JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!user) {
     navigate('/login')
    }
   }, [user])
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>

        <Routes>
        <Route path="/login" element={user?<Navigate to='/'/>:<Login />} /> 
          <Route path="/">
           {user&&<> <Route index element={<AppList />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="posts">
              <Route index element={<AppList />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="reports">
              <Route index element={<Report />} />
            </Route>
            
            </>}
          </Route>
        </Routes>

    </div>
   
  )
}

export default App
