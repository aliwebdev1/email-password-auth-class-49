import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './coponent/Login/Login';
import Register from './coponent/Register/Register';
import Main from './loyout/Main';

const router = createBrowserRouter([{
  path: '/',
  element: <Main></Main>,
  children: [
    {
      path: '/',
      element: <Register></Register>
    },
    {
      path: '/register',
      element: <Register></Register>
    },
    {
      path: '/login',
      element: <Login></Login>
    }
  ]
}])

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
