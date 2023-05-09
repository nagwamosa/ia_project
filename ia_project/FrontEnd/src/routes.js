import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
// import MovieDetails from "./pages/MovieDetails/MovieDetails"
import ManageTravellers from "./pages/Admin/ManageTravellers"
 import ShowHistory  from "./pages/Admin/ShowHistory"
import ManageAppointment from "./pages/Admin/ManageAppointment"
import Accept from "./pages/user/Accept"
import Request from "./pages/Admin/Request"
import ShowHistoryPage from "./pages/user/SearchHistoryPage"
import Search from "./pages/user/Search"
import {
  Navigate,
    createBrowserRouter,
  } from "react-router-dom";
import App from "./App";
// import Search from "./pages/user/search"

export  const routes = createBrowserRouter([
  
  {
   path: '',
   element: <App/>,
   children:[
    {path: "/",
    element: <Home/>,
    },
    {
      path: "/Search",
      element: <Search/>,
      },
   
    {
    path: "/Login",
    element: <Login/>,
    },
    {
    path: "/Register",
    element: <Register/>,
    
  } ,
  
  {
    path: "/ManageAppointment",
    element: <ManageAppointment/>,

  },
  {
    path: "/Request",
    element: <Request/>,

  },
  {
    path: "/Accept",
    element: <Accept/>,

  },
  {
    path: "/ShowHistory",
    element: <ShowHistory/>,

  },
  {
    path: "/ShowHistoryPage",
    element: <ShowHistoryPage/>,

  },
  {
    path: "/ManageTravellers",
    element: <ManageTravellers/>,

  },
 
  
],
  },

  {
    path:'*',
    element:<Navigate to={"/"}/>,
  },

  
   ]);
   