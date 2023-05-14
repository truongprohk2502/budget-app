import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: dashboardLoader,
    errorElement: <Error />,
  },
]);

const App: FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
