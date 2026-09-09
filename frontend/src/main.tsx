import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Login from './components/Login.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { AuthProvider } from "./components/AuthContext";
import Dashboard from './components/Dashboard';
import Activities from './components/Activities';
import DailyLog from './components/DailyLog';
import Reports from './components/Reports';
import Profile from './components/Profile';
import Settings from './components/Settings';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'activities', element: <Activities /> },
      { path: 'daily-log', element: <DailyLog /> },
      { path: 'reports', element: <Reports /> },
      { path: 'profile', element: <Profile /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  {
    path: '/login',
    element: <Login />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)