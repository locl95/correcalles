import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/main.scss';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from './Layout';
import Home from './pages/Home';
import View from './pages/View';
import ErrorPage from './pages/ErrorPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/:viewId/",
        element: <View />,
        errorElement: <ErrorPage />,
      }/*,
      {
        path: "/error/",
        element: <ErrorPage />,
      },
      {
        path: "*", 
        element: <Home />,
      }*/
    ],
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
