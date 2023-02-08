import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Store from "./Redux/Store";
import ClassDetails from "./Components/ClassManagement/Classes/ClassDetails";
import Payments from "./Components/PaymentManagement/Payments";
import Instructors from "./Components/InstructorManagement/Instructors";
import { CookiesProvider } from "react-cookie";
import ClassesIndex from "./Components/ClassManagement/Index";
import Institutes from "./Components/InstituteManagement/Institutes";
import Dashboard from "./Components/Dashboard/Dashboard";
import AllStudents from "./Components/StudentManagment/AllStudents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "classes",
        element: <ClassesIndex />,
      },
      {
        path: "classes/:classId",
        element: <ClassDetails />,
      },
      {
        path: "instructors",
        element: <Instructors />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "students",
        element: <AllStudents/>,
      },
      {
        path: "institutes",
        element: <Institutes />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <Provider store={Store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </CookiesProvider>

);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
