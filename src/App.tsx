import "./App.css";
import Forecast from "./pages/Forecast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Forecast />
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
