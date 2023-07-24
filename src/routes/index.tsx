import { createBrowserRouter } from "react-router-dom";
import AddNewBook from "../components/AddBook/AddNewBook";
import BookDetails from "../components/BookList/BookDetails";
import EditBook from "../components/BookList/EditBook";
import Login from "../components/LoginRegister/Login";
import Register from "../components/LoginRegister/Register";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/addbook",
    element: <AddNewBook />,
  },
  {
    path: "/bookdetails/:id",
    element: <BookDetails />,
  },
  {
    path: "/editbook/:id",
    element: (
      <PrivateRoute>
        <EditBook />
      </PrivateRoute>
    ),
  },
]);

export default routes;
