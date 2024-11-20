import FallbackPage from 'components/pages/FallbackPage';
import ItineraryPage from 'components/pages/ItineraryPage';
import AppLayout from 'components/pages/layout/AppLayout';
import HomeLayout from 'components/pages/layout/HomeLayout';
import LoginPage from 'components/pages/LoginPage';
import PackingListPage from 'components/pages/PackingListPage';
import RegistrationPage from 'components/pages/RegistrationPage';
import TripSettingsPage from 'components/pages/TripSettingsPage';
import WeatherPage from 'components/pages/WeatherPage';
import ProtectedRoute from 'components/ProtectedRoute';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedRoute forLoggedIn={false} />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<RegistrationPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route element={<ProtectedRoute forLoggedIn={false} />}>
          <Route path="/" element={<div>placeholder</div>} />
        </Route>
        <Route element={<ProtectedRoute forLoggedIn={true} />}>
          {/* The other routes */}
          <Route path="trips">
            <Route path="upcoming" element={<div>Placeholder for Upcoming Trips</div>} />
            <Route path="past" element={<div>Placeholder for Past Trips</div>} />
          </Route>

          <Route element={<HomeLayout />}>
            <Route path="weather" element={<WeatherPage />} />
            <Route path="itinerary" element={<ItineraryPage />} />
            <Route path="packinglist" element={<PackingListPage />} />
            <Route path="settings" element={<TripSettingsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<FallbackPage />} />
      </Route>
    </Route>
  )
);

export default appRouter;
