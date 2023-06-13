import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import RecipeIndex from './routes/app/recipe/RecipeIndex';
import { QueryClient, QueryClientProvider } from 'react-query'
import Root from './routes/Root';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './routes/identity/Login';
import Register from './routes/identity/Register';
import RecipeDetails from './routes/app/recipe/RecipeDetails';
import ErrorPage from './routes/ErrorPage';
import RecipeCreate from './routes/app/recipe/RecipeCreate';
import Home from './routes/Home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "recipes/",
        element: <RecipeIndex />,

      },
      {
        path: "/",
        element: <Home />,

      },
      {
        path: "recipes/:id",
        element: <RecipeDetails />,

      },
      {
        path: "recipes/create",
        element: <RecipeCreate />,

      },
      {
        path: "login/",
        element: <Login />,

      },
      {
        path: "register/",
        element: <Register />,

      },
    ]

  },

]);


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);