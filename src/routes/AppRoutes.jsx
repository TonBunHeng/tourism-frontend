import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Dashboard from '../pages/dashboard/DashboardLayout'
import PlacesLayout from '../pages/places/PlacesLayout'
import CategoriesLayout from '../pages/categories/CategoriesLayout'
import ProvincesLayout from '../pages/provinces/ProvincesLayout'
import GalleryLayout from '../pages/gallerys/GalleryLayout'
import EventsLayout from '../pages/events/EventsLayout'
import ReviewsLayout from '../pages/reviews/ReviewsLayout'
import RatingsLayout from '../pages/ratings/RatingsLayout'
import FavoritesLayout from '../pages/favorites/FavoritesLayout'
import DeleteAccount from '../pages/delete/DeleteAccout'
import Chats from '../pages/account/Chats'
import Settings from '../pages/account/Settings'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/place" element={<PlacesLayout />} />
        <Route path="/categories" element={<CategoriesLayout />} />
        <Route path="/provinces" element={<ProvincesLayout />} />
        <Route path="/gallery" element={<GalleryLayout />} />
        <Route path="/events" element={<EventsLayout />} />
        <Route path="/reviews" element={<ReviewsLayout />} />
        <Route path="/ratings" element={<RatingsLayout />} />
        <Route path="/favorites" element={<FavoritesLayout />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/chat" element={<Chats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes