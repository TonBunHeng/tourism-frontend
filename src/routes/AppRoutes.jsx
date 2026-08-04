import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Main from '../layouts/Main';
// Auth Pages (Don't have Sidebar/Footer)
import Login from '../pages/auth/Login';

// Content Pages (Have Content)
import Dashboard from '../pages/dashboard/Dashboard';
import Places from '../pages/places/Places';
import Categories from '../pages/categories/Categories';
import Provinces from '../pages/provinces/Provinces';
import Gallery from '../pages/galleries/Gallery';
import Events from '../pages/events/Events';
import Users from '../pages/users/Users';
import Reviews from '../pages/reviews/Reviews';
import Ratings from '../pages/ratings/Ratings';
import Favorites from '../pages/favorites/Favorites';
import DeletionRequests from '../pages/delete/DeletionRequests';
import Chats from '../pages/chats/Chats';
import Settings from '../pages/settings/Settings';
import Profile from '../pages/profiles/Profile';
import Reports from '../pages/reports/Reports';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes - Don't have Sidebar/Footer */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Navigate to="/" replace />} /> 

        {/* Protected Routes - Have Sidebar/Footer */}
        <Route element={<Main />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/place" element={<Places />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/provinces" element={<Provinces />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/deletion-requests" element={<DeletionRequests />} />
          <Route path="/chat" element={<Chats />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;