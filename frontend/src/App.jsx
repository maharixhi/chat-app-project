import { createBrowserRouter,RouterProvider } from "react-router-dom";

import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },  
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
