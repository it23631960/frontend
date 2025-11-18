import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import HairSalonListing from "./components/HairSalonListing";
import BarberShopListing from "./components/BarberShopListing";
import NailSalonListing from "./components/NailSalonListing";
import BridalSalonListing from "./components/BridalSalonListing";
import UserProfile from "./components/UserProfile";
import AppointmentBooking from "./components/AppointmentBooking";
import LoginPage from "./components/auth/LoginPage";
import AdminLoginPage from "./components/auth/AdminLoginPage";
import AdminLandingPage from "./components/admin/AdminLandingPage";
import AdminUsersPage from "./components/admin/AdminUsersPage";
import AdminSalonsPage from "./components/admin/AdminSalonsPage";
import OwnerDashboardPage from "./components/owner/OwnerDashboardPage";
import { NotificationProvider } from "./services/NotificationService";

export function AppRouter() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/hair-salons" element={<HairSalonListing />} />
          <Route path="/barber-shops" element={<BarberShopListing />} />
          <Route path="/nail-salons" element={<NailSalonListing />} />
          <Route path="/bridal-salons" element={<BridalSalonListing />} />
          <Route path="/salon/:salonId/book" element={<AppointmentBooking />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminLandingPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/salons" element={<AdminSalonsPage />} />
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  );
}
