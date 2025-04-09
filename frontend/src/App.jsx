// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Inbox from './Inbox';
import Body from "./Body";
import Mail from "./Mail";
import SendEmail from "./Sendemail";
import Signup from "./Signup";
import Login from "./Login";
import { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />
      },
      {
        path: "/mail/:id",
        element: <Mail />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

function App() {
  const open = useSelector((state) => state.app.open); // access the open state from Redux

  return (
    <div className='bg-[#F6F8FC] h-screen overflow-hidden'>
      <RouterProvider router={appRouter} />

      {/* Compose Email Box */}
      <div className="absolute w-[30%] bottom-0 right-20 z-10">
        {open && <SendEmail />}
      </div>

      <Toaster />
    </div>
  );
}

export default App;



