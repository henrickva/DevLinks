import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from './Home'
import Login from './Login'
import Admin  from './Admin'
import Private from '../routes/Private'
import SingIn from '../page/SignIn'
import Networks from './Networks'


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/admin",
      element:<Private><Admin /></Private> ,
    },
    {
      path: "/cadastro",
      element:<SingIn />,
    },
    {
      path: "/admin/sociais",
      element:<Private><Networks /></Private>,
    }
  ]);
  
  export const Router = () => (
      <RouterProvider router={router} />
  )