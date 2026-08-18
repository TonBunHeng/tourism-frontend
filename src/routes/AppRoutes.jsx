import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Route Guards
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Layout
import Main from '../layouts/Main';

// Auth Pages
import Login from '../pages/auth/Login';

// Content Pages
import Dashboard from '../pages/dashboard/Dashboard';
import Places from '../pages/places/Places';
import Categories from '../pages/categories/Categories';
import Provinces from '../pages/provinces/Provinces';
import Gallery from '../pages/galleries/Gallery';
import Events from '../pages/events/Events';
import Users from '../pages/users/Users';
import Ratings from '../pages/ratings/Ratings';
import Favorites from '../pages/favorites/Favorites';
import DeletionRequests from '../pages/delete/DeletionRequests';
import Chats from '../pages/chats/Chats';
import Settings from '../pages/settings/Settings';
import Profile from '../pages/profiles/Profile';
import Reports from '../pages/reports/Reports';
import Notifications from '../pages/notifications/Notifications';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public / Guest Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Root and Auth Redirections */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/logout" element={<Navigate to="/login" replace />} />

        {/* Protected Routes - Authenticated Users Only */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Main />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/place" element={<Places />} />
            <Route path="/places" element={<Places />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/provinces" element={<Provinces />} />
            <Route path="/galleries" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user" element={<Navigate to="/users" replace />} />
            <Route path="/reviews" element={<Ratings />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/deletion-requests" element={<DeletionRequests />} />
            <Route path="/chat" element={<Chats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
