import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import { dashboardLoader } from "./pages/Dashboard";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dashboardAction } from "./actions/dashboard";
import Expenses, {expensesLoader, expensesAction} from "./pages/Expenses";
import BudgetPage, { budgetPageAction, budgetPageLoader } from "./pages/BudgetPage";
import { deleteBudgetAction } from "./actions/deleteBudgetAction";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      loader: mainLoader,
      children: [
        {
          path: "/",
          element: <Dashboard />,
          errorElement: <Error />,
          loader: dashboardLoader,
          action: dashboardAction
        },
        {
          path: "expenses",
          element: <Expenses />,
          errorElement: <Error />,
          loader: expensesLoader,
          action: expensesAction,
        },
        {
          path: "budget/:id",
          element: <BudgetPage />,
          errorElement: <Error />,
          loader: budgetPageLoader,
          action: budgetPageAction,
          children: [
            {
              path: "delete",
              errorElement: <Error />,
              action: deleteBudgetAction,
            },
          ]
        },
        {
          path: "logout",
          action: logoutAction,
          errorElement: <Error />,
        },
      ]
    },

]);


function App() {
  return (
    <>
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
    </>
  )
}

export default App
