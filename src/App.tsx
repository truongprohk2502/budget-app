import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutAction } from "./actions/logout";
import Error from "./pages/Error";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import MainLayout, { mainLoader } from "./layouts/MainLayout";
import ExpensesPage, {
  expensesAction,
  expensesLoader,
} from "./pages/ExpensesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

const App: FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
