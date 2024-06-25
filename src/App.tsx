import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Daily from "./pages/Daily";
import Weekly from "./pages/Weekly";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Daily />
        },
        {
          path: '/weekly',
          element: <Weekly />
        }
      ]
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
